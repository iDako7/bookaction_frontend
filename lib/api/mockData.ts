import courseContent from "@/docs/course_content.json";
import type {
  ModulesOverviewResponse,
  ModuleTheme,
  ConceptTutorial,
  ConceptQuizResponse,
  QuizQuestion,
  ConceptSummary,
  ModuleReflection,
  QuizSubmissionResponse,
  ReflectionSubmissionResponse,
  ProgressResponse,
} from "@/lib/types/api";

// Type for the course content structure
interface CourseModule {
  module: {
    title: string;
    description: string;
    order_index: number;
  };
  theme: {
    title: string;
    context: string;
    media_url: string;
    media_type: string;
    question: string;
  };
  concepts: Array<{
    order_index: number;
    title: string;
    definition: string;
    why_it_works: string;
    tutorial: {
      order_index: number;
      good_story: string;
      good_media_url: string;
      bad_story: string;
      bad_media_url: string;
    };
    summary: {
      order_index: number;
      summary_content: string;
      next_chapter_intro?: string;
    };
    quizzes: Array<{
      order_index: number;
      question: string;
      question_type: string;
      media_url: string;
      options: string[];
      explanation: string;
      correct_option_index: number[];
    }>;
  }>;
  reflection: {
    module_summary: string;
    module_summary_media_url: string;
    learning_advice: string;
  };
}

const typedCourseContent = courseContent as CourseModule[];

// Generate unique IDs for modules and concepts
let moduleIdCounter = 1;
let conceptIdCounter = 1;
let quizIdCounter = 1;
let reflectionIdCounter = 1;

const moduleMap = new Map<number, CourseModule>();
const conceptMap = new Map<number, { module: CourseModule; concept: any; moduleId: number }>();
const quizMap = new Map<number, { quiz: any; conceptId: number }>();
const reflectionMap = new Map<number, { reflection: any; moduleId: number }>();

// Initialize mappings
typedCourseContent.forEach((module) => {
  const moduleId = moduleIdCounter++;
  moduleMap.set(moduleId, module);
  
  const reflectionId = reflectionIdCounter++;
  reflectionMap.set(reflectionId, { reflection: module.reflection, moduleId });

  module.concepts.forEach((concept) => {
    const conceptId = conceptIdCounter++;
    conceptMap.set(conceptId, { module, concept, moduleId });

    concept.quizzes.forEach((quiz) => {
      const quizId = quizIdCounter++;
      quizMap.set(quizId, { quiz, conceptId });
    });
  });
});

/**
 * Mock implementation of GET /api/modules/overview
 */
export function getModulesOverview(): ModulesOverviewResponse {
  const modules = Array.from(moduleMap.entries())
    .sort(([, a], [, b]) => a.module.order_index - b.module.order_index)
    .map(([id, module]) => {
      const conceptsForModule = Array.from(conceptMap.entries())
        .filter(([, data]) => data.moduleId === id)
        .sort(([, a], [, b]) => a.concept.order_index - b.concept.order_index)
        .map(([conceptId, data]) => ({
          id: conceptId,
          title: data.concept.title,
          completed: false, // Will be updated by progress store
        }));

      return {
        id,
        title: module.module.title,
        description: module.module.description,
        theme: {
          title: module.theme.title,
          context: module.theme.context,
          mediaUrl: module.theme.media_url,
          mediaType: module.theme.media_type,
          question: module.theme.question,
        },
        progress: 0, // Will be calculated by progress store
        concepts: conceptsForModule,
      };
    });

  return { modules };
}

/**
 * Mock implementation of GET /api/modules/:moduleId/theme
 */
export function getModuleTheme(moduleId: number): ModuleTheme {
  const courseModule = moduleMap.get(moduleId);
  if (!courseModule) {
    throw new Error(`Module ${moduleId} not found`);
  }

  return {
    title: courseModule.theme.title,
    context: courseModule.theme.context,
    mediaUrl: courseModule.theme.media_url,
    mediaType: courseModule.theme.media_type,
    question: courseModule.theme.question,
  };
}

/**
 * Mock implementation of GET /api/concepts/:conceptId/tutorial
 */
export function getConceptTutorial(conceptId: number): ConceptTutorial {
  const data = conceptMap.get(conceptId);
  if (!data) {
    throw new Error(`Concept ${conceptId} not found`);
  }

  const { concept } = data;
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
}

/**
 * Mock implementation of GET /api/concepts/:conceptId/quiz
 */
export function getConceptQuiz(conceptId: number): ConceptQuizResponse {
  const quizzes = Array.from(quizMap.entries())
    .filter(([, data]) => data.conceptId === conceptId)
    .map(([id, data]) => data.quiz)
    .sort((a, b) => a.order_index - b.order_index);

  const questions: QuizQuestion[] = Array.from(quizMap.entries())
    .filter(([, data]) => data.conceptId === conceptId)
    .sort(([, a], [, b]) => a.quiz.order_index - b.quiz.order_index)
    .map(([id, data]) => ({
      id,
      orderIndex: data.quiz.order_index,
      question: data.quiz.question,
      questionType: data.quiz.question_type as "single_choice" | "multiple_choice",
      mediaUrl: data.quiz.media_url,
      options: data.quiz.options,
      correctOptionIndex: data.quiz.correct_option_index,
      explanation: data.quiz.explanation,
    }));

  return { questions };
}

/**
 * Mock implementation of POST /api/quiz/:quizId/answer
 */
export function submitQuizAnswer(
  quizId: number,
  userAnswerIndices: number[]
): QuizSubmissionResponse {
  const quizData = quizMap.get(quizId);
  if (!quizData) {
    throw new Error(`Quiz ${quizId} not found`);
  }

  const { quiz } = quizData;
  const correctIndices = quiz.correct_option_index as number[];

  // Calculate score
  let score = 0;
  if (quiz.question_type === "single_choice") {
    score = userAnswerIndices[0] === correctIndices[0] ? 1 : 0;
  } else {
    // Multiple choice - partial credit
    const correctSet = new Set(correctIndices);
    const userSet = new Set(userAnswerIndices);
    const intersection = [...correctSet].filter((x) => userSet.has(x));
    score = intersection.length / correctIndices.length;
  }

  return {
    userAnswerIndices,
    correctOptionIndices: correctIndices,
    score,
  };
}

/**
 * Mock implementation of GET /api/concepts/:conceptId/summary
 */
export function getConceptSummary(conceptId: number): ConceptSummary {
  const data = conceptMap.get(conceptId);
  if (!data) {
    throw new Error(`Concept ${conceptId} not found`);
  }

  const { concept } = data;
  return {
    summaryContent: concept.summary.summary_content,
    nextConceptIntro: concept.summary.next_chapter_intro,
  };
}

/**
 * Mock implementation of GET /api/modules/:moduleId/reflection
 */
export function getModuleReflection(moduleId: number): ModuleReflection {
  const courseModule = moduleMap.get(moduleId);
  if (!courseModule) {
    throw new Error(`Module ${moduleId} not found`);
  }

  return {
    type: "text",
    prompt: courseModule.reflection.module_summary,
    mediaUrl: courseModule.reflection.module_summary_media_url,
  };
}

/**
 * Mock implementation of POST /api/modules/:moduleId/reflection
 */
export function submitModuleReflection(
  moduleId: number,
  answer: string,
  userId: number = 1,
  timeSpent?: number
): ReflectionSubmissionResponse {
  const reflectionEntry = Array.from(reflectionMap.entries()).find(
    ([, data]) => data.moduleId === moduleId
  );
  
  if (!reflectionEntry) {
    throw new Error(`Reflection for module ${moduleId} not found`);
  }

  const [reflectionId] = reflectionEntry;

  return {
    message: "Reflection saved successfully",
    reflectionId,
    userId,
    answer,
    timeSpent: timeSpent || 0,
  };
}

/**
 * Mock implementation of POST /api/concepts/:conceptId/progress
 */
export function updateConceptProgress(
  conceptId: number,
  isCompleted: boolean,
  userId: number = 1,
  timeSpent?: number
): ProgressResponse {
  return {
    id: conceptId,
    concept_id: conceptId,
    user_id: userId,
    order_index: 0,
    completed: isCompleted,
    time_spent: timeSpent || 0,
    completed_at: isCompleted ? new Date().toISOString() : null,
    created_at: new Date().toISOString(),
  };
}

// Helper to get module ID from concept ID
export function getModuleIdForConcept(conceptId: number): number | undefined {
  return conceptMap.get(conceptId)?.moduleId;
}

// Helper to get all concept IDs for a module
export function getConceptIdsForModule(moduleId: number): number[] {
  return Array.from(conceptMap.entries())
    .filter(([, data]) => data.moduleId === moduleId)
    .map(([id]) => id);
}


