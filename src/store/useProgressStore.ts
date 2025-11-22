import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedConcepts: number[];
  completedThemes: number[];
  streak: number;
  
  // Actions
  completeConcept: (conceptId: number) => void;
  completeTheme: (moduleId: number) => void;
  setStreak: (streak: number) => void;
  isConceptCompleted: (conceptId: number) => boolean;
  isThemeCompleted: (moduleId: number) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedConcepts: [],
      completedThemes: [],
      streak: 7, // Mock default

      completeConcept: (conceptId) => set((state) => {
        if (state.completedConcepts.includes(conceptId)) return state;
        return { completedConcepts: [...state.completedConcepts, conceptId] };
      }),

      completeTheme: (moduleId) => set((state) => {
        if (state.completedThemes.includes(moduleId)) return state;
        return { completedThemes: [...state.completedThemes, moduleId] };
      }),

      setStreak: (streak) => set({ streak }),

      isConceptCompleted: (conceptId) => get().completedConcepts.includes(conceptId),
      isThemeCompleted: (moduleId) => get().completedThemes.includes(moduleId),
    }),
    {
      name: 'bookaction-progress',
    }
  )
);
