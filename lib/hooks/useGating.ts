import { useModulesOverview } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { useMemo } from "react";

export function useModuleStats(moduleId: number) {
  const { data } = useModulesOverview();
  const progressStore = useProgressStore();

  const moduleData = data?.modules.find((m) => m.id === moduleId);
  const totalConcepts = moduleData?.concepts.length || 0;

  const isThemeViewed = progressStore.isThemeViewed(moduleId);
  const isReflectionViewed = progressStore.isReflectionViewed(moduleId);
  const isCompleted = progressStore.isModuleCompleted(moduleId);
  
  // Calculate completion based on summaryViewed
  const completedConcepts = moduleData?.concepts.filter((c) => 
    progressStore.isConceptSummaryViewed(moduleId, c.id)
  ).length || 0;

  const percentage = totalConcepts > 0 
    ? Math.round((completedConcepts / totalConcepts) * 100) 
    : 0;

  return {
    percentage,
    isThemeViewed,
    isReflectionViewed,
    completedConcepts,
    totalConcepts,
    isCompleted,
  };
}

export function useCanAccessConceptIntro(moduleId: number, conceptId: number, orderIndex: number) {
  const { data } = useModulesOverview();
  const progressStore = useProgressStore();

  const canAccess = useMemo(() => {
    // If data isn't loaded yet, default to false (or true if we trust optimistic?)
    // Better to lock until we know.
    if (!data) return false;
    
    // 1. Theme must be viewed
    if (!progressStore.isThemeViewed(moduleId)) return false;

    // 2. If orderIndex is 1 (first concept), it's accessible if theme is viewed
    if (orderIndex === 1) return true;

    // 3. Otherwise, previous concept summary must be viewed
    const moduleData = data.modules.find((m) => m.id === moduleId);
    if (!moduleData) return false;

    // concepts are usually sorted by API. We assume array index matches order.
    // orderIndex is 1-based. Previous concept is at index `orderIndex - 2`.
    const prevConceptIndex = orderIndex - 2;
    if (prevConceptIndex < 0 || prevConceptIndex >= moduleData.concepts.length) {
      return false;
    }

    const prevConcept = moduleData.concepts[prevConceptIndex];
    return progressStore.isConceptSummaryViewed(moduleId, prevConcept.id);

  }, [data, moduleId, orderIndex, progressStore]);

  return { canAccess };
}
