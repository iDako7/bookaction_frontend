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
} from "@/lib/types/api";
import * as mockData from "./mockData";

// Environment flag to toggle between mock and API
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

// Axios instance for API calls
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * API Client with automatic mock/real toggle
 */
export const api = {
  // Modules
  getModulesOverview: async (): Promise<ModulesOverviewResponse> => {
    if (USE_MOCK_DATA) {
      return mockData.getModulesOverview();
    }
    const response = await apiClient.get<ModulesOverviewResponse>(
      "/modules/overview"
    );
    return response.data;
  },

  getModuleTheme: async (moduleId: number): Promise<ModuleTheme> => {
    if (USE_MOCK_DATA) {
      return mockData.getModuleTheme(moduleId);
    }
    const response = await apiClient.get<ModuleTheme>(
      `/modules/${moduleId}/theme`
    );
    return response.data;
  },

  getModuleReflection: async (moduleId: number): Promise<ModuleReflection> => {
    if (USE_MOCK_DATA) {
      return mockData.getModuleReflection(moduleId);
    }
    const response = await apiClient.get<ModuleReflection>(
      `/modules/${moduleId}/reflection`
    );
    return response.data;
  },

  submitModuleReflection: async (
    moduleId: number,
    submission: ReflectionSubmission
  ): Promise<ReflectionSubmissionResponse> => {
    if (USE_MOCK_DATA) {
      return mockData.submitModuleReflection(
        moduleId,
        submission.answer,
        submission.userId,
        submission.timeSpent
      );
    }
    const response = await apiClient.post<ReflectionSubmissionResponse>(
      `/modules/${moduleId}/reflection`,
      submission
    );
    return response.data;
  },

  // Concepts
  getConceptTutorial: async (conceptId: number): Promise<ConceptTutorial> => {
    if (USE_MOCK_DATA) {
      return mockData.getConceptTutorial(conceptId);
    }
    const response = await apiClient.get<ConceptTutorial>(
      `/concepts/${conceptId}/tutorial`
    );
    return response.data;
  },

  getConceptQuiz: async (conceptId: number): Promise<ConceptQuizResponse> => {
    if (USE_MOCK_DATA) {
      return mockData.getConceptQuiz(conceptId);
    }
    const response = await apiClient.get<ConceptQuizResponse>(
      `/concepts/${conceptId}/quiz`
    );
    return response.data;
  },

  getConceptSummary: async (conceptId: number): Promise<ConceptSummary> => {
    if (USE_MOCK_DATA) {
      return mockData.getConceptSummary(conceptId);
    }
    const response = await apiClient.get<ConceptSummary>(
      `/concepts/${conceptId}/summary`
    );
    return response.data;
  },

  updateConceptProgress: async (
    conceptId: number,
    update: ProgressUpdate
  ): Promise<ProgressResponse> => {
    if (USE_MOCK_DATA) {
      return mockData.updateConceptProgress(
        conceptId,
        update.isCompleted,
        update.userId,
        update.timeSpent
      );
    }
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
    if (USE_MOCK_DATA) {
      return mockData.submitQuizAnswer(quizId, submission.userAnswerIndices);
    }
    const response = await apiClient.post<QuizSubmissionResponse>(
      `/quiz/${quizId}/answer`,
      submission
    );
    return response.data;
  },
};

export default api;

