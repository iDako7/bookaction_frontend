"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { MessageSquare, Lightbulb } from 'lucide-react';
import { moduleReflections, modulesData } from '@/lib/mockData';
import { useProgressStore } from '@/store/useProgressStore';

export default function ModuleReflectionPage() {
  const params = useParams();
  const router = useRouter();
  const { completeReflection } = useProgressStore();
  
  if (!params) return null;

  const moduleId = Number(params.moduleId);
  const reflection = moduleReflections[moduleId];
  const module = modulesData.find(m => m.id === moduleId);

  const [response, setResponse] = useState('');

  if (!reflection || !module) return <div>Reflection not found</div>;

  const handleComplete = () => {
    completeReflection(moduleId);
    // Navigate to module completed
    router.push(`/modules/${moduleId}/completed`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <Card variant="elevated" padding="xl">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-5xl">🤔</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                💭 Reflection Time
              </div>
              <h1 className="mb-3">Reflect on Your Learning</h1>
              <p className="text-xl text-gray-600">
                You've completed <span className="font-semibold text-[#818CF8]">{module.title}</span>!
              </p>
            </div>
            
            {/* Prompt */}
            <div className="mb-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="m-0 mb-3">Reflection Question</h3>
                  <p className="text-lg text-gray-800 m-0">{reflection.prompt}</p>
                </div>
              </div>
            </div>
            
            {/* Text Area */}
            <div className="mb-8">
              <label className="block mb-3 font-semibold text-gray-900">
                Your Thoughts
              </label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Take a moment to reflect on what you've learned and how you'll apply it..."
                className="w-full h-48 p-6 border-2 border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-lg"
              />
              <p className="text-sm text-gray-500 mt-3">
                💡 Tip: Writing down your thoughts helps solidify your learning
              </p>
            </div>
            
            {/* Guidance */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="m-0 mb-3">Reflection Tips</h4>
                  <ul className="space-y-2 m-0 pl-5">
                    {reflection.guidancePoints.map((point, index) => (
                      <li key={index} className="text-gray-700">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleComplete} 
              disabled={response.trim().length === 0}
              size="lg" 
              fullWidth
            >
              Complete Module →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
