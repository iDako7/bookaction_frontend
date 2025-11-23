import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/client";
import type {
  QuizSubmission,
  ReflectionSubmission,
  ProgressUpdate,
} from "@/lib/types/api";

/**
 * Query keys for React Query
 */
export const queryKeys = {
  modulesOverview: ["modules", "overview"] as const,
  moduleTheme: (moduleId: number) => ["modules", moduleId, "theme"] as const,
  moduleReflection: (moduleId: number) =>
    ["modules", moduleId, "reflection"] as const,
  conceptTutorial: (conceptId: number) =>
    ["concepts", conceptId, "tutorial"] as const,
  conceptQuiz: (conceptId: number) => ["concepts", conceptId, "quiz"] as const,
  conceptSummary: (conceptId: number) =>
    ["concepts", conceptId, "summary"] as const,
};

/**
 * Hook to fetch modules overview
 */
export function useModulesOverview() {
  return useQuery({
    queryKey: queryKeys.modulesOverview,
    queryFn: () => api.getModulesOverview(),
  });
}

/**
 * Hook to fetch module theme
 */
export function useModuleTheme(moduleId: number) {
  return useQuery({
    queryKey: queryKeys.moduleTheme(moduleId),
    queryFn: () => api.getModuleTheme(moduleId),
    enabled: !!moduleId,
  });
}

/**
 * Hook to fetch module reflection
 */
export function useModuleReflection(moduleId: number) {
  return useQuery({
    queryKey: queryKeys.moduleReflection(moduleId),
    queryFn: () => api.getModuleReflection(moduleId),
    enabled: !!moduleId,
  });
}

/**
 * Hook to submit module reflection
 */
export function useSubmitModuleReflection(moduleId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submission: ReflectionSubmission) =>
      api.submitModuleReflection(moduleId, submission),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.moduleReflection(moduleId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.modulesOverview,
      });
    },
  });
}

/**
 * Hook to fetch concept tutorial
 */
export function useConceptTutorial(conceptId: number) {
  return useQuery({
    queryKey: queryKeys.conceptTutorial(conceptId),
    queryFn: () => api.getConceptTutorial(conceptId),
    enabled: !!conceptId,
  });
}

/**
 * Hook to fetch concept quiz
 */
export function useConceptQuiz(conceptId: number) {
  return useQuery({
    queryKey: queryKeys.conceptQuiz(conceptId),
    queryFn: () => api.getConceptQuiz(conceptId),
    enabled: !!conceptId,
  });
}

/**
 * Hook to submit quiz answer
 */
export function useSubmitQuizAnswer(quizId: number) {
  return useMutation({
    mutationFn: (submission: QuizSubmission) =>
      api.submitQuizAnswer(quizId, submission),
  });
}

/**
 * Hook to fetch concept summary
 */
export function useConceptSummary(conceptId: number) {
  return useQuery({
    queryKey: queryKeys.conceptSummary(conceptId),
    queryFn: () => api.getConceptSummary(conceptId),
    enabled: !!conceptId,
  });
}

/**
 * Hook to update concept progress
 */
export function useUpdateConceptProgress(conceptId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (update: ProgressUpdate) =>
      api.updateConceptProgress(conceptId, update),
    onSuccess: () => {
      // Invalidate modules overview to refresh progress
      queryClient.invalidateQueries({
        queryKey: queryKeys.modulesOverview,
      });
    },
  });
}



