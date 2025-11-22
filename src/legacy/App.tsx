import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LearnPage } from './pages/LearnPage';
import { ModuleThemePage } from './pages/ModuleThemePage';
import { ConceptIntroPage } from './pages/ConceptIntroPage';
import { PracticeIntroPage } from './pages/PracticeIntroPage';
import { PracticeQuestionPage } from './pages/PracticeQuestionPage';
import { ConceptSummaryPage } from './pages/ConceptSummaryPage';
import { ModuleReflectionPage } from './pages/ModuleReflectionPage';
import { ModuleCompletedPage } from './pages/ModuleCompletedPage';
import { MedalPage } from './pages/MedalPage';
import { ProfilePage } from './pages/ProfilePage';
import {
  modulesData,
  conceptTutorials,
  conceptQuizzes,
  conceptSummaries,
  moduleReflections
} from './lib/mockData';

type Page =
  | { type: 'learn' }
  | { type: 'profile' }
  | { type: 'theme'; moduleId: number }
  | { type: 'conceptIntro'; conceptId: number }
  | { type: 'practiceIntro'; conceptId: number }
  | { type: 'practice'; conceptId: number }
  | { type: 'conceptSummary'; conceptId: number; moduleId: number }
  | { type: 'moduleReflection'; moduleId: number }
  | { type: 'moduleCompleted'; moduleId: number }
  | { type: 'medal' };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'learn' });
  const [completedConcepts, setCompletedConcepts] = useState<Set<number>>(new Set());
  const [completedThemes, setCompletedThemes] = useState<Set<number>>(new Set());
  const [streak, setStreak] = useState(7); // Mock streak data
  
  // Calculate total concepts
  const totalConcepts = modulesData.reduce((sum, module) => sum + module.concepts.length, 0);
  const allModulesCompleted = completedConcepts.size === totalConcepts;
  
  // Get module ID for a concept
  const getModuleIdForConcept = (conceptId: number): number => {
    for (const module of modulesData) {
      if (module.concepts.some(c => c.id === conceptId)) {
        return module.id;
      }
    }
    return 1;
  };
  
  // Get next concept in module
  const getNextConceptInModule = (currentConceptId: number, moduleId: number): number | null => {
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return null;
    
    const currentIndex = module.concepts.findIndex(c => c.id === currentConceptId);
    if (currentIndex === -1 || currentIndex === module.concepts.length - 1) {
      return null;
    }
    
    return module.concepts[currentIndex + 1].id;
  };
  
  // Check if module is complete
  const isModuleComplete = (moduleId: number): boolean => {
    const module = modulesData.find(m => m.id === moduleId);
    if (!module) return false;
    return module.concepts.every(c => completedConcepts.has(c.id));
  };
  
  const handleNavigate = (page: string) => {
    if (page === 'learn') {
      setCurrentPage({ type: 'learn' });
    } else if (page === 'profile') {
      setCurrentPage({ type: 'profile' });
    }
  };
  
  const handleStartTheme = (moduleId: number) => {
    setCurrentPage({ type: 'theme', moduleId });
  };
  
  const handleStartConcept = (conceptId: number) => {
    setCurrentPage({ type: 'conceptIntro', conceptId });
  };
  
  const handleCompleteConceptIntro = (conceptId: number) => {
    setCurrentPage({ type: 'practiceIntro', conceptId });
  };
  
  const handleStartPractice = (conceptId: number) => {
    setCurrentPage({ type: 'practice', conceptId });
  };
  
  const handleCompletePractice = (conceptId: number) => {
    const moduleId = getModuleIdForConcept(conceptId);
    
    // Mark concept as completed
    setCompletedConcepts(prev => new Set([...prev, conceptId]));
    
    setCurrentPage({ type: 'conceptSummary', conceptId, moduleId });
  };
  
  const handleContinueFromSummary = (conceptId: number, moduleId: number) => {
    const nextConceptId = getNextConceptInModule(conceptId, moduleId);
    
    if (nextConceptId) {
      // Go to next concept
      setCurrentPage({ type: 'conceptIntro', conceptId: nextConceptId });
    } else {
      // Module complete - go to reflection
      setCurrentPage({ type: 'moduleReflection', moduleId });
    }
  };
  
  const handleCompleteReflection = (moduleId: number) => {
    setCurrentPage({ type: 'moduleCompleted', moduleId });
  };
  
  const handleBackToLearn = () => {
    // Check if all modules are complete
    if (allModulesCompleted) {
      setCurrentPage({ type: 'medal' });
    } else {
      setCurrentPage({ type: 'learn' });
    }
  };
  
  // Auto-show medal page when all modules completed
  useEffect(() => {
    if (allModulesCompleted && currentPage.type === 'learn') {
      setCurrentPage({ type: 'medal' });
    }
  }, [allModulesCompleted, currentPage.type]);
  
  const renderPage = () => {
    switch (currentPage.type) {
      case 'learn':
        return (
          <LearnPage
            modules={modulesData}
            onStartTheme={handleStartTheme}
            onStartConcept={handleStartConcept}
            completedConcepts={completedConcepts}
            completedThemes={completedThemes}
          />
        );
      
      case 'profile':
        return (
          <ProfilePage
            completedConcepts={completedConcepts}
            totalConcepts={totalConcepts}
            streak={streak}
          />
        );
      
      case 'theme': {
        const module = modulesData.find(m => m.id === currentPage.moduleId);
        if (!module) return null;
        
        return (
          <ModuleThemePage
            theme={module.theme}
            onStart={() => {
              // Mark theme as completed when starting first concept
              setCompletedThemes(prev => new Set([...prev, currentPage.moduleId]));
              handleStartConcept(module.concepts[0].id);
            }}
            onBack={() => setCurrentPage({ type: 'learn' })}
          />
        );
      }
      
      case 'conceptIntro': {
        const tutorial = conceptTutorials[currentPage.conceptId];
        if (!tutorial) return null;
        
        return (
          <ConceptIntroPage
            tutorial={tutorial}
            onComplete={() => handleCompleteConceptIntro(currentPage.conceptId)}
            onBack={() => setCurrentPage({ type: 'learn' })}
          />
        );
      }
      
      case 'practiceIntro': {
        const tutorial = conceptTutorials[currentPage.conceptId];
        if (!tutorial) return null;
        
        return (
          <PracticeIntroPage
            conceptTitle={tutorial.title}
            onStart={() => handleStartPractice(currentPage.conceptId)}
          />
        );
      }
      
      case 'practice': {
        const quiz = conceptQuizzes[currentPage.conceptId];
        if (!quiz) return null;
        
        return (
          <PracticeQuestionPage
            questions={quiz.questions}
            onComplete={() => handleCompletePractice(currentPage.conceptId)}
          />
        );
      }
      
      case 'conceptSummary': {
        const summary = conceptSummaries[currentPage.conceptId];
        const tutorial = conceptTutorials[currentPage.conceptId];
        if (!summary || !tutorial) return null;
        
        return (
          <ConceptSummaryPage
            summary={summary}
            conceptTitle={tutorial.title}
            onContinue={() => handleContinueFromSummary(currentPage.conceptId, currentPage.moduleId)}
          />
        );
      }
      
      case 'moduleReflection': {
        const reflection = moduleReflections[currentPage.moduleId];
        const module = modulesData.find(m => m.id === currentPage.moduleId);
        if (!reflection || !module) return null;
        
        return (
          <ModuleReflectionPage
            reflection={reflection}
            moduleTitle={module.title}
            onComplete={() => handleCompleteReflection(currentPage.moduleId)}
          />
        );
      }
      
      case 'moduleCompleted': {
        const module = modulesData.find(m => m.id === currentPage.moduleId);
        if (!module) return null;
        
        return (
          <ModuleCompletedPage
            moduleTitle={module.title}
            onBackToLearn={handleBackToLearn}
          />
        );
      }
      
      case 'medal':
        return (
          <MedalPage
            completedConcepts={completedConcepts.size}
            totalConcepts={totalConcepts}
            streak={streak}
            onBackToLearn={() => setCurrentPage({ type: 'learn' })}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage.type === 'profile' ? 'profile' : 'learn'}
      />
      {renderPage()}
    </div>
  );
}