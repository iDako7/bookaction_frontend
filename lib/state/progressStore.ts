import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Progress tracking for modules and concepts
 */
export interface ConceptProgress {
  conceptId: number;
  themeViewed: boolean;
  introCompleted: boolean;
  practiceCompleted: boolean;
  summaryViewed: boolean;
  quizAnswers: Record<number, number[]>; // quizId -> selected indices
  timeSpent: number;
}

export interface ModuleProgress {
  moduleId: number;
  themeViewed: boolean;
  reflectionViewed: boolean;
  concepts: Record<number, ConceptProgress>;
  completed: boolean;
}

interface ProgressState {
  userId: number;
  modules: Record<number, ModuleProgress>;
  
  // Module actions
  markThemeViewed: (moduleId: number) => void;
  markReflectionViewed: (moduleId: number) => void;
  markModuleCompleted: (moduleId: number) => void;
  
  // Concept actions
  markConceptIntroCompleted: (moduleId: number, conceptId: number) => void;
  markConceptPracticeCompleted: (moduleId: number, conceptId: number) => void;
  markConceptSummaryViewed: (moduleId: number, conceptId: number) => void;
  saveQuizAnswer: (
    moduleId: number,
    conceptId: number,
    quizId: number,
    answers: number[]
  ) => void;
  
  // Getters
  getModuleProgress: (moduleId: number) => ModuleProgress | undefined;
  getConceptProgress: (
    moduleId: number,
    conceptId: number
  ) => ConceptProgress | undefined;
  isThemeViewed: (moduleId: number) => boolean;
  isConceptIntroCompleted: (moduleId: number, conceptId: number) => boolean;
  isConceptPracticeCompleted: (moduleId: number, conceptId: number) => boolean;
  isConceptSummaryViewed: (moduleId: number, conceptId: number) => boolean;
  isReflectionViewed: (moduleId: number) => boolean;
  isModuleCompleted: (moduleId: number) => boolean;
  
  // Helpers
  getConceptCompletionPercentage: (moduleId: number, totalConcepts: number) => number;
  
  // Reset for testing
  reset: () => void;
}

const initialState = {
  userId: 1, // Default user
  modules: {} as Record<number, ModuleProgress>,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Module actions
      markThemeViewed: (moduleId) =>
        set((state) => {
          const module = state.modules[moduleId] || {
            moduleId,
            themeViewed: false,
            reflectionViewed: false,
            concepts: {},
            completed: false,
          };
          return {
            modules: {
              ...state.modules,
              [moduleId]: { ...module, themeViewed: true },
            },
          };
        }),

      markReflectionViewed: (moduleId) =>
        set((state) => {
          const module = state.modules[moduleId];
          if (!module) return state;
          return {
            modules: {
              ...state.modules,
              [moduleId]: { ...module, reflectionViewed: true },
            },
          };
        }),

      markModuleCompleted: (moduleId) =>
        set((state) => {
          const module = state.modules[moduleId];
          if (!module) return state;
          return {
            modules: {
              ...state.modules,
              [moduleId]: { ...module, completed: true },
            },
          };
        }),

      // Concept actions
      markConceptIntroCompleted: (moduleId, conceptId) =>
        set((state) => {
          const module = state.modules[moduleId] || {
            moduleId,
            themeViewed: false,
            reflectionViewed: false,
            concepts: {},
            completed: false,
          };
          const concept = module.concepts[conceptId] || {
            conceptId,
            themeViewed: false,
            introCompleted: false,
            practiceCompleted: false,
            summaryViewed: false,
            quizAnswers: {},
            timeSpent: 0,
          };
          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...module,
                concepts: {
                  ...module.concepts,
                  [conceptId]: { ...concept, introCompleted: true },
                },
              },
            },
          };
        }),

      markConceptPracticeCompleted: (moduleId, conceptId) =>
        set((state) => {
          const module = state.modules[moduleId];
          if (!module) return state;
          const concept = module.concepts[conceptId];
          if (!concept) return state;
          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...module,
                concepts: {
                  ...module.concepts,
                  [conceptId]: { ...concept, practiceCompleted: true },
                },
              },
            },
          };
        }),

      markConceptSummaryViewed: (moduleId, conceptId) =>
        set((state) => {
          const module = state.modules[moduleId];
          if (!module) return state;
          const concept = module.concepts[conceptId];
          if (!concept) return state;
          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...module,
                concepts: {
                  ...module.concepts,
                  [conceptId]: { ...concept, summaryViewed: true },
                },
              },
            },
          };
        }),

      saveQuizAnswer: (moduleId, conceptId, quizId, answers) =>
        set((state) => {
          const module = state.modules[moduleId];
          if (!module) return state;
          const concept = module.concepts[conceptId];
          if (!concept) return state;
          return {
            modules: {
              ...state.modules,
              [moduleId]: {
                ...module,
                concepts: {
                  ...module.concepts,
                  [conceptId]: {
                    ...concept,
                    quizAnswers: {
                      ...concept.quizAnswers,
                      [quizId]: answers,
                    },
                  },
                },
              },
            },
          };
        }),

      // Getters
      getModuleProgress: (moduleId) => get().modules[moduleId],
      
      getConceptProgress: (moduleId, conceptId) =>
        get().modules[moduleId]?.concepts[conceptId],
      
      isThemeViewed: (moduleId) => get().modules[moduleId]?.themeViewed || false,
      
      isConceptIntroCompleted: (moduleId, conceptId) =>
        get().modules[moduleId]?.concepts[conceptId]?.introCompleted || false,
      
      isConceptPracticeCompleted: (moduleId, conceptId) =>
        get().modules[moduleId]?.concepts[conceptId]?.practiceCompleted || false,
      
      isConceptSummaryViewed: (moduleId, conceptId) =>
        get().modules[moduleId]?.concepts[conceptId]?.summaryViewed || false,
      
      isReflectionViewed: (moduleId) =>
        get().modules[moduleId]?.reflectionViewed || false,
      
      isModuleCompleted: (moduleId) =>
        get().modules[moduleId]?.completed || false,

      getConceptCompletionPercentage: (moduleId, totalConcepts) => {
        const mod = get().modules[moduleId];
        if (!mod || totalConcepts === 0) return 0;
        const completedCount = Object.values(mod.concepts).filter(
          (c) => c.summaryViewed
        ).length;
        return Math.round((completedCount / totalConcepts) * 100);
      },

      reset: () => set(initialState),
    }),
    {
      name: "bookaction-progress",
      version: 1,
    }
  )
);











