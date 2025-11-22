"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { conceptTutorials } from '@/lib/mockData';
import { Brain } from 'lucide-react';

export default function PracticeIntroPage() {
  const params = useParams();
  const router = useRouter();
  
  if (!params) return null;

  const conceptId = Number(params.conceptId);
  const tutorial = conceptTutorials[conceptId];

  if (!tutorial) return <div>Tutorial not found</div>;

  const handleStart = () => {
    router.push(`/concepts/${conceptId}/practice`);
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <Card variant="elevated" padding="xl">
            <div className="w-28 h-28 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-6xl">🎯</span>
            </div>
            
            <h1 className="mb-6">Ready to Practice?</h1>
            <p className="text-xl text-gray-600 mb-8">
              Let's apply what you learned about <span className="font-semibold text-[#818CF8]">{tutorial.title}</span> with some practice questions.
            </p>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-indigo-100">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Multiple Choice</p>
                  <p className="text-sm text-gray-600 m-0">Choose the best answer</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Instant Feedback</p>
                  <p className="text-sm text-gray-600 m-0">Learn as you go</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md">
                    <span className="text-2xl">💪</span>
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">Build Skills</p>
                  <p className="text-sm text-gray-600 m-0">Practice makes perfect</p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleStart} size="lg" fullWidth>
              Start Practice →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
