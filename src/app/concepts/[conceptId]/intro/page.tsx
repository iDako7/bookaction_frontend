"use client";

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { StepIndicator } from '@/components/StepIndicator';
import { conceptTutorials } from '@/lib/mockData';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useProgressStore } from '@/store/useProgressStore';

export default function ConceptIntroPage() {
  const params = useParams();
  const router = useRouter();
  const { completeConceptStage } = useProgressStore();
  
  if (!params) return null;

  const conceptId = Number(params.conceptId);
  const tutorial = conceptTutorials[conceptId];

  const [currentStep, setCurrentStep] = useState(0);

  if (!tutorial) return <div>Tutorial not found</div>;
  
  const steps = [
    {
      title: 'What is it?',
      content: (
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
              📚 Definition
            </div>
          </div>
          <h3 className="text-center mb-6">{tutorial.title}</h3>
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-md">
            <p className="text-lg text-gray-700">{tutorial.definition}</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Why it works</p>
                <p className="text-gray-700 m-0">{tutorial.whyItWorks}</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Good Example',
      content: (
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              ✅ Good Example
            </div>
          </div>
          {tutorial.tutorial.goodExample.mediaUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={tutorial.tutorial.goodExample.mediaUrl}
                alt="Good example illustration"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
            <p className="text-gray-800 whitespace-pre-line text-lg leading-relaxed">{tutorial.tutorial.goodExample.story}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Bad Example',
      content: (
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
              ❌ What to Avoid
            </div>
          </div>
          {tutorial.tutorial.badExample.mediaUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src={tutorial.tutorial.badExample.mediaUrl}
                alt="Bad example illustration"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-8 border-2 border-red-200">
            <p className="text-gray-800 whitespace-pre-line text-lg leading-relaxed">{tutorial.tutorial.badExample.story}</p>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeConceptStage(conceptId, 'intro');
      router.push(`/concepts/${conceptId}/practice/intro`);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/');
    }
  };
  
  return (
    <div className="container-custom py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <StepIndicator currentStep={currentStep + 1} totalSteps={steps.length} />
          <p className="text-[#4A4A4A] text-center mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>
        
        <Card padding="lg">
          {steps[currentStep].content}
          
          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleBack}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
              fullWidth
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Continue to Practice'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
