import axios from "axios";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/lib/test-utils";
import PracticeQuestionPage from "@/app/module/[moduleId]/concept/[conceptId]/practice/question/page";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { ConceptQuizResponse, User } from "@/lib/types/api";
import { useProgressStore } from "@/lib/state/progressStore";

// Router mock to observe navigation without triggering Next.js
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const TEST_USER = {
  email: "testuser_new@example.com",
  username: "testuser_new",
  password: "Password123",
};

type AuthContext = { token: string; user: User };

const seedAuthStorage = ({ token, user }: AuthContext) => {
  localStorage.setItem(
    "bookaction-auth",
    JSON.stringify({
      state: { token, user, isAuthenticated: true },
      version: 1,
    })
  );
};

async function ensureTestUser(): Promise<AuthContext> {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  const login = async () =>
    client.post("/auth/login", {
      emailOrUsername: TEST_USER.email,
      password: TEST_USER.password,
    });

  // Try login first; if it fails, attempt registration then login again.
  let loginRes;
  try {
    loginRes = await login();
  } catch {
    try {
      await client.post("/auth/register", {
        email: TEST_USER.email,
        username: TEST_USER.username,
        password: TEST_USER.password,
      });
    } catch (error: any) {
      // If the user already exists or validation fails, proceed to login anyway.
      const status = error?.response?.status;
      const acceptable = [400, 401, 409, 500];
      if (!acceptable.includes(status)) {
        throw error;
      }
    }
    loginRes = await login();
  }

  const data = loginRes.data?.data ?? loginRes.data;
  if (!data?.accessToken || !data?.user) {
    throw new Error("Login response missing token or user");
  }

  return { token: data.accessToken, user: data.user };
}

async function findConceptWithQuiz(auth: AuthContext): Promise<{
  moduleId: number;
  conceptId: number;
  quiz: ConceptQuizResponse;
}> {
  const authedClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${auth.token}` },
  });

  const overviewRes = await authedClient.get("/modules/overview");
  const overview = overviewRes.data;

  for (const module of overview.modules) {
    for (const concept of module.concepts) {
      try {
        const quizRes = await authedClient.get(
          `/concepts/${concept.id}/quiz`
        );
        const quiz = quizRes.data as ConceptQuizResponse;
        if (quiz.questions?.length) {
          return { moduleId: module.id, conceptId: concept.id, quiz };
        }
      } catch {
        // Skip concepts that don't have quizzes yet or error out
      }
    }
  }

  throw new Error("No concept with quiz found from backend");
}

describe("Quiz Flow Integration (backend)", () => {
  vi.setConfig({ testTimeout: 30000 });

  let backendReady = true;
  let moduleId: number;
  let conceptId: number;
  let quizData: ConceptQuizResponse | null = null;
  let authContext: AuthContext | null = null;

  beforeAll(async () => {
    process.env.NEXT_PUBLIC_USE_MOCK_DATA = "false";
    process.env.NEXT_PUBLIC_API_URL = API_BASE_URL;

    try {
      authContext = await ensureTestUser();
      seedAuthStorage(authContext);

      const conceptWithQuiz = await findConceptWithQuiz(authContext);
      moduleId = conceptWithQuiz.moduleId;
      conceptId = conceptWithQuiz.conceptId;
      quizData = conceptWithQuiz.quiz;
    } catch (error) {
      backendReady = false;
      console.error(
        `Backend not reachable at ${API_BASE_URL}. Start BookAction_BackEnd with "npm run dev" before running this test.`,
        error
      );
    }
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useProgressStore.getState().reset();
    if (authContext) {
      seedAuthStorage(authContext);
    }
  });

  it("renders practice page, submits answers, and navigates with live data", async () => {
    if (!backendReady || !quizData) {
      throw new Error(
        `Backend not reachable at ${API_BASE_URL}. Start BookAction_BackEnd with "npm run dev" before running this test.`
      );
    }

    const params = Promise.resolve({
      moduleId: String(moduleId),
      conceptId: String(conceptId),
    }) as any;
    params._testValue = {
      moduleId: String(moduleId),
      conceptId: String(conceptId),
    };

    // Seed progress store so practice completion can be recorded
    const store = useProgressStore.getState();
    store.markConceptIntroCompleted(moduleId, conceptId);

    renderWithProviders(<PracticeQuestionPage params={params} />);

    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];

      await screen.findByText(question.question, undefined, { timeout: 15000 });

      // Select the correct options based on backend response
      question.correctOptionIndex.forEach((optionIndex) => {
        const optionText = question.options[optionIndex];
        fireEvent.click(screen.getByText(optionText));
      });

      fireEvent.click(screen.getByText("Check Answer"));

      await screen.findByText("Correct!", undefined, { timeout: 8000 });

      const nextLabel =
        i === quizData.questions.length - 1
          ? "View Summary →"
          : "Next Question →";

      const nextButton = await screen.findByText(nextLabel, undefined, {
        timeout: 8000,
      });
      fireEvent.click(nextButton);
    }

    expect(mockPush).toHaveBeenCalledWith(
      `/module/${moduleId}/concept/${conceptId}/summary`
    );

    const progress = useProgressStore
      .getState()
      .getConceptProgress(moduleId, conceptId);
    expect(progress?.practiceCompleted).toBe(true);
  });

  it("follows gating flow: theme -> intro -> practice -> summary -> reflection", async () => {
    const store = useProgressStore.getState();
    const testModuleId = 1;
    const testConceptId = 101;

    store.markThemeViewed(testModuleId);
    expect(store.isThemeViewed(testModuleId)).toBe(true);

    store.markConceptIntroCompleted(testModuleId, testConceptId);
    expect(store.isConceptIntroCompleted(testModuleId, testConceptId)).toBe(
      true
    );

    store.markConceptPracticeCompleted(testModuleId, testConceptId);
    expect(store.isConceptPracticeCompleted(testModuleId, testConceptId)).toBe(
      true
    );

    store.markConceptSummaryViewed(testModuleId, testConceptId);
    expect(store.isConceptSummaryViewed(testModuleId, testConceptId)).toBe(
      true
    );

    store.markModuleCompleted(testModuleId);
    expect(store.isModuleCompleted(testModuleId)).toBe(true);
  });
});
