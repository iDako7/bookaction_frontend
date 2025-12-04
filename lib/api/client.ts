import axios from "axios";
import type {
  ModulesOverviewResponse,
  ModuleTheme,
  ConceptTutorial,
  ConceptQuizResponse,
  QuizSubmission,
  QuizSubmissionResponse,
  ConceptSummary,
  ModuleReflection,
  ReflectionSubmission,
  ReflectionSubmissionResponse,
  ProgressUpdate,
  ProgressResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "@/lib/types/api";

const defaultApiBase = "http://localhost:3000/api";

const resolveApiBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return typeof window === "undefined" ? defaultApiBase : "/api";
};

// Axios instance for API calls
const apiClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
apiClient.interceptors.request.use(
  (config) => {
    // Keep baseURL in sync with env for SSR, browser, and tests
    config.baseURL = resolveApiBaseUrl();

    // Only access localStorage on the client side
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("bookaction-auth");
      if (storage) {
        try {
          const parsed = JSON.parse(storage);
          const token = parsed.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.error("Failed to parse auth token", e);
        }
      }
    }
    return config;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear storage and redirect to login if unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("bookaction-auth");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API Client
 */
export const api = {
  // Modules
  getModulesOverview: async (): Promise<ModulesOverviewResponse> => {
    const response = await apiClient.get<ModulesOverviewResponse>(
      "/modules/overview"
    );
    return response.data;
  },

  getModuleTheme: async (moduleId: number): Promise<ModuleTheme> => {
    const response = await apiClient.get<ModuleTheme>(
      `/modules/${moduleId}/theme`
    );
    return response.data;
  },

  getModuleReflection: async (moduleId: number): Promise<ModuleReflection> => {
    const response = await apiClient.get<ModuleReflection>(
      `/modules/${moduleId}/reflection`
    );
    return response.data;
  },

  submitModuleReflection: async (
    moduleId: number,
    submission: ReflectionSubmission
  ): Promise<ReflectionSubmissionResponse> => {
    const response = await apiClient.post<ReflectionSubmissionResponse>(
      `/modules/${moduleId}/reflection`,
      submission
    );
    return response.data;
  },

  // Concepts
  getConceptTutorial: async (conceptId: number): Promise<ConceptTutorial> => {
    const response = await apiClient.get<ConceptTutorial>(
      `/concepts/${conceptId}/tutorial`
    );
    return response.data;
  },

  getConceptQuiz: async (conceptId: number): Promise<ConceptQuizResponse> => {
    const response = await apiClient.get<ConceptQuizResponse>(
      `/concepts/${conceptId}/quiz`
    );
    return response.data;
  },

  getConceptSummary: async (conceptId: number): Promise<ConceptSummary> => {
    const response = await apiClient.get<ConceptSummary>(
      `/concepts/${conceptId}/summary`
    );
    return response.data;
  },

  updateConceptProgress: async (
    conceptId: number,
    update: ProgressUpdate
  ): Promise<ProgressResponse> => {
    const response = await apiClient.post<ProgressResponse>(
      `/concepts/${conceptId}/progress`,
      update
    );
    return response.data;
  },

  // Quiz
  submitQuizAnswer: async (
    quizId: number,
    submission: QuizSubmission
  ): Promise<QuizSubmissionResponse> => {
    const response = await apiClient.post<QuizSubmissionResponse>(
      `/concepts/quiz/${quizId}/answer`,
      submission
    );
    return response.data;
  },

  // Auth
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<any>("/auth/login", {
      emailOrUsername: data.emailOrUsername,
      password: data.password,
    });
    return {
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<any>("/auth/register", data);
    return {
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },
};

export default api;
