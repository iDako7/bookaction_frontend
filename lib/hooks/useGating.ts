import { useProgressStore } from "@/lib/state/progressStore";
import { useModulesOverview } from "./useApi";
import { useMemo } from "react";

/**
 * Gating logic:
 * - Theme must be viewed before accessing concept 1
 * - Concept N intro requires concept N-1 summary completed
 * - Practice requires intro completed
 * - Summary requires practice completed
 * - Reflection requires all concept summaries completed
 * - Medal requires all modules completed
 */

export interface GatingStatus {
  canAccess: boolean;
  reason?: string;
  redirectTo?: string;
}

/**
 * Check if theme is accessible (always true)
 */
export function useCanAccessTheme(moduleId: number): GatingStatus {
  return { canAccess: true };
}

/**
 * Check if concept intro is accessible
 */
export function useCanAccessConceptIntro(
  moduleId: number,
  conceptId: number,
  conceptOrderIndex: number
): GatingStatus {
  const isThemeViewed = useProgressStore((state) =>
    state.isThemeViewed(moduleId)
  );
  const { data: modulesData } = useModulesOverview();

  // Theme must be viewed first for concept 1
  if (conceptOrderIndex === 1 && !isThemeViewed) {
    return {
      canAccess: false,
      reason: "Theme must be completed first",
      redirectTo: `/module/${moduleId}/theme`,
    };
  }

  // For concept N > 1, check if concept N-1 summary is viewed
  if (conceptOrderIndex > 1) {
    const module = modulesData?.modules.find((m) => m.id === moduleId);
    const previousConcept = module?.concepts.find(
      (c) => c.id !== conceptId && conceptOrderIndex > 1
    );

    if (previousConcept) {
      const isPreviousSummaryViewed = useProgressStore.getState().isConceptSummaryViewed(
        moduleId,
        previousConcept.id
      );

      if (!isPreviousSummaryViewed) {
        return {
          canAccess: false,
          reason: "Previous concept must be completed first",
          redirectTo: `/module/${moduleId}/concept/${previousConcept.id}/intro`,
        };
      }
    }
  }

  return { canAccess: true };
}

/**
 * Check if concept practice is accessible
 */
export function useCanAccessConceptPractice(
  moduleId: number,
  conceptId: number
): GatingStatus {
  const isIntroCompleted = useProgressStore((state) =>
    state.isConceptIntroCompleted(moduleId, conceptId)
  );

  if (!isIntroCompleted) {
    return {
      canAccess: false,
      reason: "Intro must be completed first",
      redirectTo: `/module/${moduleId}/concept/${conceptId}/intro`,
    };
  }

  return { canAccess: true };
}

/**
 * Check if concept summary is accessible
 */
export function useCanAccessConceptSummary(
  moduleId: number,
  conceptId: number
): GatingStatus {
  const isPracticeCompleted = useProgressStore((state) =>
    state.isConceptPracticeCompleted(moduleId, conceptId)
  );

  if (!isPracticeCompleted) {
    return {
      canAccess: false,
      reason: "Practice must be completed first",
      redirectTo: `/module/${moduleId}/concept/${conceptId}/practice/intro`,
    };
  }

  return { canAccess: true };
}

/**
 * Check if module reflection is accessible
 */
export function useCanAccessReflection(moduleId: number): GatingStatus {
  const { data: modulesData } = useModulesOverview();
  const module = modulesData?.modules.find((m) => m.id === moduleId);

  if (!module) {
    return { canAccess: false, reason: "Module not found" };
  }

  // Check if all concept summaries are viewed
  const allSummariesViewed = module.concepts.every((concept) =>
    useProgressStore.getState().isConceptSummaryViewed(moduleId, concept.id)
  );

  if (!allSummariesViewed) {
    return {
      canAccess: false,
      reason: "All concepts must be completed first",
      redirectTo: `/learn`,
    };
  }

  return { canAccess: true };
}

/**
 * Check if medal page is accessible
 */
export function useCanAccessMedal(): GatingStatus {
  const { data: modulesData } = useModulesOverview();

  if (!modulesData) {
    return { canAccess: false, reason: "Loading..." };
  }

  // Check if all modules are completed
  const allModulesCompleted = modulesData.modules.every((module) =>
    useProgressStore.getState().isModuleCompleted(module.id)
  );

  if (!allModulesCompleted) {
    return {
      canAccess: false,
      reason: "All modules must be completed first",
      redirectTo: "/learn",
    };
  }

  return { canAccess: true };
}

/**
 * Get next available step in the learning path
 */
export function useNextStep(
  moduleId: number,
  conceptId?: number
): string | null {
  const { data: modulesData } = useModulesOverview();
  const module = modulesData?.modules.find((m) => m.id === moduleId);

  if (!module) return null;

  // If no conceptId, check theme or first concept
  if (!conceptId) {
    const isThemeViewed = useProgressStore.getState().isThemeViewed(moduleId);
    if (!isThemeViewed) {
      return `/module/${moduleId}/theme`;
    }
    return `/module/${moduleId}/concept/${module.concepts[0].id}/intro`;
  }

  // Check current concept progress
  const concept = module.concepts.find((c) => c.id === conceptId);
  if (!concept) return null;

  const isIntroCompleted = useProgressStore
    .getState()
    .isConceptIntroCompleted(moduleId, conceptId);
  const isPracticeCompleted = useProgressStore
    .getState()
    .isConceptPracticeCompleted(moduleId, conceptId);
  const isSummaryViewed = useProgressStore
    .getState()
    .isConceptSummaryViewed(moduleId, conceptId);

  if (!isIntroCompleted) {
    return `/module/${moduleId}/concept/${conceptId}/intro`;
  }
  if (!isPracticeCompleted) {
    return `/module/${moduleId}/concept/${conceptId}/practice/intro`;
  }
  if (!isSummaryViewed) {
    return `/module/${moduleId}/concept/${conceptId}/summary`;
  }

  // Find next concept
  const currentIndex = module.concepts.findIndex((c) => c.id === conceptId);
  if (currentIndex < module.concepts.length - 1) {
    const nextConcept = module.concepts[currentIndex + 1];
    return `/module/${moduleId}/concept/${nextConcept.id}/intro`;
  }

  // All concepts done, go to reflection
  return `/module/${moduleId}/reflection`;
}

/**
 * Hook to get module statistics
 */
export function useModuleStats(moduleId: number) {
  const { data: modulesData } = useModulesOverview();
  const module = modulesData?.modules.find((m) => m.id === moduleId);
  const progress = useProgressStore((state) => state.getModuleProgress(moduleId));

  return useMemo(() => {
    if (!module) return null;

    const totalConcepts = module.concepts.length;
    const completedConcepts = module.concepts.filter((c) =>
      progress?.concepts[c.id]?.summaryViewed
    ).length;

    return {
      totalConcepts,
      completedConcepts,
      percentage: Math.round((completedConcepts / totalConcepts) * 100),
      isThemeViewed: progress?.themeViewed || false,
      isReflectionViewed: progress?.reflectionViewed || false,
      isCompleted: progress?.completed || false,
    };
  }, [module, progress]);
}

