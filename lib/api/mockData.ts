import {
  ModulesOverviewResponse,
  ModuleTheme,
  ConceptTutorial,
  ConceptQuizResponse,
  QuizSubmissionResponse,
  ConceptSummary,
  ModuleReflection,
  ReflectionSubmissionResponse,
  ProgressResponse,
} from "@/lib/types/api";
import courseContent from "@/docs/course_content.json";

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getModulesOverview = async (): Promise<ModulesOverviewResponse> => {
  await delay(500);
  // Map JSON to API shape
  return {
    modules: courseContent.map((m: any, index: number) => {
      const moduleId = m.module.id || (index + 1);
      return {
        id: moduleId,
        title: m.module.title,
        description: m.module.description,
        theme: {
          title: m.theme.title,
          context: m.theme.context,
          mediaUrl: m.theme.media_url,
          question: m.theme.question,
        },
        concepts: m.concepts.map((c: any, cIndex: number) => ({
          id: c.id || (moduleId * 100 + cIndex + 1), // Ensure unique ID per concept
          title: c.title,
          completed: false, // Mock data default
        })),
      };
    }),
  };
};

export const getModuleTheme = async (moduleId: number): Promise<ModuleTheme> => {
  await delay(300);
  // In the JSON, we don't have explicit IDs for modules, so we'll use order_index or find by index for now.
  // Assuming the input JSON structure is an array of modules.
  // We need to match the logic in getModulesOverview where we assign IDs.
  // For mock data, let's assume the index + 1 is the ID if not present.
  
  const module = courseContent.find((m: any, index: number) => (m.module.id || index + 1) === moduleId);
  
  if (!module) throw new Error("Module not found");
  
  return {
    title: module.theme.title,
    context: module.theme.context,
    mediaUrl: module.theme.media_url,
    question: module.theme.question,
  };
};

export const getConceptTutorial = async (conceptId: number): Promise<ConceptTutorial> => {
  await delay(300);
  // Find concept across all modules
  let concept: any;
  
  courseContent.forEach((m: any, mIndex: number) => {
    const moduleId = m.module.id || (mIndex + 1);
    const found = m.concepts.find((c: any, cIndex: number) => {
      const currentId = c.id || (moduleId * 100 + cIndex + 1);
      return currentId === conceptId;
    });
    if (found) concept = found;
  });

  if (!concept) throw new Error("Concept not found");

  return {
    title: concept.title,
    definition: concept.definition,
    whyItWorks: concept.why_it_works,
    tutorial: {
      goodExample: {
        story: concept.tutorial.good_story,
        mediaUrl: concept.tutorial.good_media_url,
      },
      badExample: {
        story: concept.tutorial.bad_story,
        mediaUrl: concept.tutorial.bad_media_url,
      },
    },
  };
};

export const getConceptQuiz = async (conceptId: number): Promise<ConceptQuizResponse> => {
  await delay(300);
  let concept: any;
  courseContent.forEach((m: any, mIndex: number) => {
     const moduleId = m.module.id || (mIndex + 1);
     m.concepts.forEach((c: any, cIndex: number) => {
        const currentId = c.id || (moduleId * 100 + cIndex + 1);
        if (currentId === conceptId) {
            concept = c;
        }
    });
  });

  if (!concept) throw new Error("Concept not found");

  return {
    questions: concept.quizzes.map((q: any) => ({
      orderIndex: q.order_index,
      question: q.question,
      questionType: q.question_type,
      mediaUrl: q.media_url,
      options: q.options,
      correctOptionIndex: q.correct_option_index,
      explanation: q.explanation,
    })),
  };
};

export const submitQuizAnswer = async (
  quizId: number,
  userAnswerIndices: number[]
): Promise<QuizSubmissionResponse> => {
  await delay(500);
  // In a real mock, we'd validate against the correct answer
  // For now, return a dummy success response
  return {
    userAnswerIndices,
    correctOptionIndices: [0], // Dummy correct
    score: 100,
  };
};

export const getConceptSummary = async (conceptId: number): Promise<ConceptSummary> => {
  await delay(300);
  let concept: any;
  courseContent.forEach((m: any, mIndex: number) => {
     const moduleId = m.module.id || (mIndex + 1);
     m.concepts.forEach((c: any, cIndex: number) => {
        const currentId = c.id || (moduleId * 100 + cIndex + 1);
        if (currentId === conceptId) {
            concept = c;
        }
    });
  });

  if (!concept) throw new Error("Concept not found");

  return {
    summaryContent: concept.summary.summary_content,
    nextConceptIntro: concept.summary.next_chapter_intro,
  };
};

export const getModuleReflection = async (moduleId: number): Promise<ModuleReflection> => {
  await delay(300);
  const module = courseContent.find((m: any, index: number) => (m.module.id || index + 1) === moduleId);
  if (!module) throw new Error("Module not found");

  return {
    type: "text",
    prompt: module.reflection.module_summary, // Using module summary as prompt for now
    mediaUrl: module.reflection.module_summary_media_url,
  };
};

export const submitModuleReflection = async (
  moduleId: number,
  answer: string,
  userId: number,
  timeSpent: number
): Promise<ReflectionSubmissionResponse> => {
  await delay(500);
  return {
    success: true,
    moduleId,
  };
};

export const updateConceptProgress = async (
  conceptId: number,
  isCompleted: boolean,
  userId: number,
  timeSpent: number
): Promise<ProgressResponse> => {
  await delay(300);
  return {
    success: true,
    conceptId,
    isCompleted,
  };
};
