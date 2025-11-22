"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Trophy } from 'lucide-react';
import { modulesData } from '@/lib/mockData';
import { useProgressStore } from '@/store/useProgressStore';

export default function ModuleCompletedPage() {
  const params = useParams();
  const router = useRouter();
  
  if (!params) return null;

  const moduleId = Number(params.moduleId);
  const module = modulesData.find(m => m.id === moduleId);
  const { completedConcepts } = useProgressStore();
  const totalConcepts = modulesData.reduce((sum, m) => sum + m.concepts.length, 0);

  if (!module) return <div>Module not found</div>;

  const handleBackToLearn = () => {
    // Check if all modules completed (all concepts completed)
    if (completedConcepts.length === totalConcepts) {
      router.push('/medal');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <Card variant="elevated" padding="xl">
            {/* Success Animation */}
            <div className="relative mb-10">
              {/* Confetti decoration - positioned around trophy */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute -top-4 left-1/4 text-4xl animate-bounce" style={{ animationDelay: '0ms' }}>🎉</div>
                <div className="absolute -top-4 right-1/4 text-4xl animate-bounce" style={{ animationDelay: '150ms' }}>🎉</div>
                <div className="absolute top-1/3 left-8 text-3xl animate-pulse" style={{ animationDelay: '300ms' }}>✨</div>
                <div className="absolute top-1/3 right-8 text-3xl animate-pulse" style={{ animationDelay: '450ms' }}>✨</div>
                <div className="absolute bottom-8 left-1/3 text-3xl animate-bounce" style={{ animationDelay: '600ms' }}>🌟</div>
                <div className="absolute bottom-8 right-1/3 text-3xl animate-bounce" style={{ animationDelay: '750ms' }}>🌟</div>
              </div>
              
              {/* Trophy - centered and on top */}
              <div className="relative z-10 w-40 h-40 bg-gradient-to-br from-[#A5B4FC] to-[#C7D2FE] rounded-full mx-auto flex items-center justify-center shadow-2xl">
                <Trophy className="w-20 h-20 text-white" />
              </div>
            </div>
            
            <h1 className="mb-4 bg-gradient-to-r from-[#A5B4FC] to-[#C7D2FE] bg-clip-text text-transparent">
              Module Complete!
            </h1>
            <p className="text-2xl text-gray-700 mb-8">
              Congratulations on completing <br />
              <span className="font-bold text-[#818CF8]">{module.title}</span>
            </p>
            
            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-[#C7D2FE]">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-sm text-gray-600 m-0">Skills Gained</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100">
                <div className="text-4xl mb-2">🎯</div>
                <p className="text-sm text-gray-600 m-0">Goals Achieved</p>
              </div>
              <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-100">
                <div className="text-4xl mb-2">🚀</div>
                <p className="text-sm text-gray-600 m-0">Ready to Apply</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-[#C7D2FE]">
              <p className="text-lg text-gray-800 m-0">
                You've taken an important step in building stronger, healthier relationships. 
                Keep practicing what you've learned!
              </p>
            </div>
            
            <Button onClick={handleBackToLearn} size="lg" fullWidth>
              Continue Your Journey →
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
