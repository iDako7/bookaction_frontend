import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  conceptProgress: Record<number, ConceptProgress>;
  moduleProgress: Record<number, ModuleProgress>;
  completedConcepts: number[];
  completedThemes: number[];
  completedReflections: number[];
  streak: number;
  
  // Actions
  completeConceptStage: (conceptId: number, stage: ConceptStage) => void;
  completeTheme: (moduleId: number) => void;
  completeReflection: (moduleId: number) => void;
  setStreak: (streak: number) => void;
  addConceptTime: (conceptId: number, seconds: number) => void;
  addModuleTime: (moduleId: number, seconds: number) => void;
  isConceptStageCompleted: (conceptId: number, stage: ConceptStage) => boolean;
  isConceptCompleted: (conceptId: number) => boolean;
  isThemeCompleted: (moduleId: number) => boolean;
  isReflectionCompleted: (moduleId: number) => boolean;
  getConceptProgress: (conceptId: number) => ConceptProgress;
  getModuleProgress: (moduleId: number) => ModuleProgress;
}

type ConceptStage = 'intro' | 'practice' | 'summary';

type ConceptProgress = {
  intro: boolean;
  practice: boolean;
  summary: boolean;
  timeSpent: number; // seconds
};

type ModuleProgress = {
  theme: boolean;
  reflection: boolean;
  timeSpent: number; // seconds
};

const makeDefaultConceptProgress = (): ConceptProgress => ({
  intro: false,
  practice: false,
  summary: false,
  timeSpent: 0,
});

const makeDefaultModuleProgress = (): ModuleProgress => ({
  theme: false,
  reflection: false,
  timeSpent: 0,
});

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      conceptProgress: {},
      moduleProgress: {},
      completedConcepts: [],
      completedThemes: [],
      completedReflections: [],
      streak: 7, // Mock default

      completeConceptStage: (conceptId, stage) => set((state) => {
        const existing = state.conceptProgress[conceptId] ?? makeDefaultConceptProgress();
        const updated = { ...existing, [stage]: true };
        const alreadyCompleted = state.completedConcepts.includes(conceptId);
        const shouldMarkCompleted = stage === 'summary' && !alreadyCompleted;

        return {
          conceptProgress: { ...state.conceptProgress, [conceptId]: updated },
          completedConcepts: shouldMarkCompleted
            ? [...state.completedConcepts, conceptId]
            : state.completedConcepts,
        };
      }),

      completeTheme: (moduleId) => set((state) => {
        const existing = state.moduleProgress[moduleId] ?? makeDefaultModuleProgress();
        const updated = { ...existing, theme: true };
        if (state.completedThemes.includes(moduleId)) {
          return { moduleProgress: { ...state.moduleProgress, [moduleId]: updated } };
        }
        return {
          moduleProgress: { ...state.moduleProgress, [moduleId]: updated },
          completedThemes: [...state.completedThemes, moduleId],
        };
      }),

      completeReflection: (moduleId) => set((state) => {
        const existing = state.moduleProgress[moduleId] ?? makeDefaultModuleProgress();
        const updated = { ...existing, reflection: true };
        if (state.completedReflections.includes(moduleId)) {
          return { moduleProgress: { ...state.moduleProgress, [moduleId]: updated } };
        }
        return {
          moduleProgress: { ...state.moduleProgress, [moduleId]: updated },
          completedReflections: [...state.completedReflections, moduleId],
        };
      }),

      setStreak: (streak) => set({ streak }),

      addConceptTime: (conceptId, seconds) => set((state) => {
        const existing = state.conceptProgress[conceptId] ?? makeDefaultConceptProgress();
        const updated = { ...existing, timeSpent: Math.max(0, existing.timeSpent + seconds) };
        return { conceptProgress: { ...state.conceptProgress, [conceptId]: updated } };
      }),

      addModuleTime: (moduleId, seconds) => set((state) => {
        const existing = state.moduleProgress[moduleId] ?? makeDefaultModuleProgress();
        const updated = { ...existing, timeSpent: Math.max(0, existing.timeSpent + seconds) };
        return { moduleProgress: { ...state.moduleProgress, [moduleId]: updated } };
      }),

      isConceptStageCompleted: (conceptId, stage) => {
        const progress = get().conceptProgress[conceptId] ?? makeDefaultConceptProgress();
        return progress[stage];
      },

      isConceptCompleted: (conceptId) => {
        const progress = get().conceptProgress[conceptId] ?? makeDefaultConceptProgress();
        return progress.summary || get().completedConcepts.includes(conceptId);
      },

      isThemeCompleted: (moduleId) => {
        const progress = get().moduleProgress[moduleId] ?? makeDefaultModuleProgress();
        return progress.theme || get().completedThemes.includes(moduleId);
      },

      isReflectionCompleted: (moduleId) => {
        const progress = get().moduleProgress[moduleId] ?? makeDefaultModuleProgress();
        return progress.reflection || get().completedReflections.includes(moduleId);
      },

      getConceptProgress: (conceptId) => get().conceptProgress[conceptId] ?? makeDefaultConceptProgress(),
      getModuleProgress: (moduleId) => get().moduleProgress[moduleId] ?? makeDefaultModuleProgress(),
    }),
    {
      name: 'bookaction-progress',
    }
  )
);
