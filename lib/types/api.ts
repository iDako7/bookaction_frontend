// Module types
export interface ModuleTheme {
  title: string;
  context: string;
  mediaUrl: string;
  mediaType: string;
  question: string;
}

export interface ConceptListItem {
  id: number;
  title: string;
  completed: boolean;
}

export interface ModuleOverviewItem {
  id: number;
  title: string;
  description?: string;
  theme: ModuleTheme;
  progress: number;
  concepts: ConceptListItem[];
}

export interface ModulesOverviewResponse {
  modules: ModuleOverviewItem[];
}

// Concept Tutorial types
export interface TutorialExample {
  story: string;
  mediaUrl: string;
}

export interface ConceptTutorial {
  title: string;
  definition: string;
  whyItWorks: string;
  tutorial: {
    goodExample: TutorialExample;
    badExample: TutorialExample;
  };
}

// Quiz types
export interface QuizQuestion {
  id: number;
  orderIndex: number;
  question: string;
  questionType: "single_choice" | "multiple_choice";
  mediaUrl: string;
  options: string[];
  correctOptionIndex: number[];
  explanation: string;
}

export interface ConceptQuizResponse {
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  responseType: "single_choice" | "multiple_choice";
  userId: number;
  userAnswerIndices: number[];
  timeSpent?: number;
}

export interface QuizSubmissionResponse {
  userAnswerIndices: number[];
  correctOptionIndices: number[];
  score: number;
}

// Summary types
export interface ConceptSummary {
  summaryContent: string;
  nextConceptIntro?: string;
}

// Reflection types
export interface ModuleReflection {
  type: string;
  prompt: string;
  mediaUrl: string;
}

export interface ReflectionSubmission {
  reflectionId: number;
  userId: number;
  answer: string;
  timeSpent?: number;
}

export interface ReflectionSubmissionResponse {
  message: string;
  reflectionId: number;
  userId: number;
  answer: string;
  timeSpent?: number;
}

// Progress types
export interface ProgressUpdate {
  userId: number;
  isCompleted: boolean;
  timeSpent?: number;
}

export interface ProgressResponse {
  id: number;
  concept_id: number;
  user_id: number;
  order_index: number;
  completed: boolean;
  time_spent: number;
  completed_at: string | null;
  created_at: string;
}


