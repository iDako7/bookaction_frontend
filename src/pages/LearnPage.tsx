import React from 'react';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Module } from '../lib/mockData';
import { BookOpen, Circle, CheckCircle, Lock, Target, ArrowRight } from 'lucide-react';

interface LearnPageProps {
  modules: Module[];
  onStartTheme: (moduleId: number) => void;
  onStartConcept: (conceptId: number) => void;
  completedConcepts: Set<number>;
  completedThemes: Set<number>;
}

export function LearnPage({ modules, onStartTheme, onStartConcept, completedConcepts, completedThemes }: LearnPageProps) {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold">🚀 Your Learning Journey</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] bg-clip-text text-transparent">
              Level Up Your<br />Relationship Skills ⚡
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master essential communication skills through interactive lessons. Let's get started! 💪
            </p>
          </div>
          
          {/* Modules */}
          <div className="space-y-6">
            {modules.map((module, moduleIndex) => {
              const completedCount = module.concepts.filter(c => completedConcepts.has(c.id)).length;
              const progress = (completedCount / module.concepts.length) * 100;
              const allConceptsCompleted = module.concepts.every(c => completedConcepts.has(c.id));
              const themeCompleted = completedThemes.has(module.id);
              
              // Check if module is locked
              const isModuleLocked = moduleIndex > 0 && !modules[moduleIndex - 1].concepts.every(c => completedConcepts.has(c.id));
              
              return (
                <div key={module.id} className="relative">
                  {/* Module Card */}
                  <Card variant="elevated" padding="lg" className={`relative overflow-hidden ${isModuleLocked ? 'opacity-50' : ''}`}>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#60A5FA]/10 to-[#38BDF8]/10 rounded-full blur-3xl -z-0"></div>
                    
                    {/* Module Header */}
                    <div className="relative z-10 mb-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#60A5FA] to-[#38BDF8] rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                            <BookOpen className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="m-0">{module.title}</h2>
                              {allConceptsCompleted && (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span className="font-bold">Done!</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-500 m-0 text-sm">
                              {completedCount} of {module.concepts.length} lessons • {Math.round(progress)}% complete
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <ProgressBar progress={progress} height="lg" animated />
                    </div>
                    
                    {/* Lessons Grid */}
                    <div className="relative z-10 grid gap-3">
                      {/* Module Theme */}
                      <div
                        className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                          themeCompleted
                            ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50'
                            : isModuleLocked
                            ? 'border-gray-200 bg-gray-50'
                            : 'border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-lg hover:scale-[1.01]'
                        }`}
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                              themeCompleted 
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                                : isModuleLocked
                                ? 'bg-gray-300'
                                : 'bg-gradient-to-br from-amber-400 to-orange-500'
                            }`}>
                              {themeCompleted ? (
                                <CheckCircle className="w-5 h-5 text-white" />
                              ) : isModuleLocked ? (
                                <Lock className="w-5 h-5 text-white" />
                              ) : (
                                <Target className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <h4 className={`m-0 ${isModuleLocked ? 'text-gray-400' : ''}`}>
                                  Module Theme
                                </h4>
                                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
                                  Story
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 m-0">{module.theme.title}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!isModuleLocked && !themeCompleted && (
                              <button
                                onClick={() => onStartTheme(module.id)}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                Start
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            )}
                            
                            {themeCompleted && (
                              <button
                                onClick={() => onStartTheme(module.id)}
                                className="px-4 py-2 bg-white text-amber-600 border-2 border-amber-200 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                              >
                                Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Concepts */}
                      {module.concepts.map((concept, conceptIndex) => {
                        const isCompleted = completedConcepts.has(concept.id);
                        const previousCompleted = conceptIndex === 0 
                          ? themeCompleted 
                          : completedConcepts.has(module.concepts[conceptIndex - 1].id);
                        const isLocked = !previousCompleted && !isCompleted || isModuleLocked;
                        
                        return (
                          <div
                            key={concept.id}
                            className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                              isCompleted
                                ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50'
                                : isLocked
                                ? 'border-gray-200 bg-gray-50'
                                : 'border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform ${
                                  isCompleted 
                                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                                    : isLocked
                                    ? 'bg-gray-300'
                                    : 'bg-gradient-to-br from-[#60A5FA] to-[#38BDF8]'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-white" />
                                  ) : isLocked ? (
                                    <Lock className="w-5 h-5 text-white" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-white" />
                                  )}
                                </div>
                                <div>
                                  <h4 className={`m-0 ${isLocked ? 'text-gray-400' : ''}`}>
                                    {concept.title}
                                  </h4>
                                  {isLocked && !isModuleLocked && (
                                    <p className="text-xs text-gray-400 m-0">🔒 Complete previous step first</p>
                                  )}
                                  {isModuleLocked && (
                                    <p className="text-xs text-gray-400 m-0">🔒 Complete previous module</p>
                                  )}
                                  {!isLocked && !isCompleted && (
                                    <p className="text-sm text-blue-600 m-0 font-medium">✨ Ready to start!</p>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {!isLocked && !isCompleted && (
                                  <button
                                    onClick={() => onStartConcept(concept.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#60A5FA] to-[#38BDF8] text-white rounded-xl font-semibold hover:from-[#3B82F6] hover:to-[#0EA5E9] transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                  >
                                    Start
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                )}
                                
                                {isCompleted && (
                                  <button
                                    onClick={() => onStartConcept(concept.id)}
                                    className="px-4 py-2 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                                  >
                                    Review
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
