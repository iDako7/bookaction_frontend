import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ModuleThemePageProps {
  theme: {
    title: string;
    context: string;
    mediaUrl: string;
    question: string;
  };
  onStart: () => void;
  onBack: () => void;
}

export function ModuleThemePage({ theme, onStart, onBack }: ModuleThemePageProps) {
  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="text-[#818CF8] hover:text-[#A5B4FC] mb-8 font-semibold flex items-center gap-2 transition-colors"
          >
            ← Back to Learn
          </button>
          
          <Card variant="elevated" padding="xl">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                <span className="text-5xl">🎯</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                📖 Module Story
              </div>
              <h1 className="mb-2">{theme.title}</h1>
            </div>
            
            {theme.mediaUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={theme.mediaUrl}
                  alt="Module theme illustration"
                  className="w-full h-96 object-cover"
                />
              </div>
            )}
            
            <div className="mb-8 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <p className="text-lg text-gray-800 leading-relaxed">{theme.context}</p>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-2xl">🤔</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Reflection Question</p>
                  <p className="text-gray-700 m-0 italic text-lg">{theme.question}</p>
                </div>
              </div>
            </div>
            
            <Button onClick={onStart} size="lg" fullWidth>
              Start First Concept →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}