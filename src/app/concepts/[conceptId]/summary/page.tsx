"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { CheckCircle, Lightbulb, Target } from 'lucide-react';
import { conceptSummaries, conceptTutorials, modulesData } from '@/lib/mockData';
import { useProgressStore } from '@/store/useProgressStore';

export default function ConceptSummaryPage() {
  const params = useParams();
  const router = useRouter();
  const { completeConceptStage } = useProgressStore();
  
  if (!params) return null;

  const conceptId = Number(params.conceptId);
  const summary = conceptSummaries[conceptId];
  const tutorial = conceptTutorials[conceptId];

  if (!summary || !tutorial) return <div>Summary not found</div>;

  // Logic to find next step
  const getNextStep = () => {
    // Find current module
    const module = modulesData.find(m => m.concepts.some(c => c.id === conceptId));
    if (!module) return '/';

    const currentIndex = module.concepts.findIndex(c => c.id === conceptId);
    if (currentIndex < module.concepts.length - 1) {
      // Next concept
      return `/concepts/${module.concepts[currentIndex + 1].id}/intro`;
    } else {
      // Module reflection
      return `/modules/${module.id}/reflection`;
    }
  };

  const handleContinue = () => {
    completeConceptStage(conceptId, 'summary');
    router.push(getNextStep());
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <Card variant="elevated" padding="xl">
            {/* Success Header */}
            <div className="text-center mb-10">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl animate-bounce">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
              <h1 className="mb-3">Concept Complete! 🎉</h1>
              <p className="text-xl text-gray-600">
                Great job learning about <span className="font-semibold text-[#818CF8]">{tutorial.title}</span>
              </p>
            </div>
            
            {/* Key Points */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl flex items-center justify-center shadow-md">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="m-0">Key Takeaways</h3>
              </div>
              <div className="space-y-4">
                {summary.keyPoints.map((point, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-100"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <p className="m-0 text-gray-800 font-medium">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-amber-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="m-0 mb-3">Try This Today</h4>
                  <p className="text-gray-800 m-0 text-lg">{summary.nextSteps}</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleContinue} size="lg" fullWidth>
              Continue Learning →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
