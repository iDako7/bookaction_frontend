/**
 * API Type Definitions
 * Based on docs/api_design.md
 */

// --- Responses ---

export interface ModuleTheme {
  title: string;
  context: string;
  mediaUrl: string;
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
  progress?: number;
  concepts: ConceptListItem[];
}

export interface ModulesOverviewResponse {
  modules: ModuleOverviewItem[];
}

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

export interface QuizOption {
  orderIndex: number;
  question: string;
  questionType: "single_choice" | "multiple_choice";
  mediaUrl?: string;
  options: string[];
  correctOptionIndex: number[];
  explanation: string;
}

export interface ConceptQuizResponse {
  questions: QuizOption[];
}

export interface QuizSubmissionResponse {
  userAnswerIndices: number[];
  correctOptionIndices: number[];
  score: number;
}

export interface ConceptSummary {
  summaryContent: string;
  nextConceptIntro?: string;
}

export interface ModuleReflection {
  type: "text";
  prompt: string;
  mediaUrl?: string;
}

export interface ReflectionSubmissionResponse {
  success?: boolean;
  message?: string;
  reflectionId?: number;
  userId?: number;
  answer?: string;
  timeSpent?: number;
  moduleId?: number;
}

export interface ProgressResponse {
  success?: boolean;
  id?: number;
  conceptId?: number;
  concept_id?: number;
  user_id?: number;
  completed?: boolean;
  isCompleted?: boolean;
  time_spent?: number;
  completed_at?: string;
  created_at?: string;
}

// --- Requests/Submissions ---

export interface QuizSubmission {
  responseType: "single_choice" | "multiple_choice";
  userId: number;
  userAnswerIndices: number[];
  timeSpent: number;
}

export interface ReflectionSubmission {
  reflectionId?: number;
  userId: number;
  answer: string;
  timeSpent: number;
}

export interface ProgressUpdate {
  userId: number;
  isCompleted: boolean;
  timeSpent?: number;
}
