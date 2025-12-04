"use client";

import { use } from "react";
import Link from "next/link";
import { useConceptTutorial } from "@/lib/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: Promise<{
    moduleId: string;
    conceptId: string;
  }>;
}

export default function PracticeIntroPage({ params }: PageProps) {
  const { moduleId, conceptId } = use(params);
  const numericConceptId = parseInt(conceptId, 10);
  const { data: tutorial, isLoading } = useConceptTutorial(numericConceptId);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  // Fallback title if tutorial isn't loaded yet, though this shouldn't happen often
  // given the flow.
  const conceptTitle = tutorial?.title || "this concept";

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8 flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-white border-blue-100 shadow-sm overflow-hidden rounded-2xl">
        <div className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
          
          {/* Icon */}
          <div className="relative">
             {/* The design has a custom gradient background for the icon. 
                 Using a simplified version with Tailwind. */}
            <div className="w-28 h-28 bg-gradient-to-b from-indigo-300/80 to-indigo-200/80 rounded-full flex items-center justify-center shadow-lg">
               <span className="text-6xl">🎯</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Ready to Practice?
          </h1>

          {/* Subtitle */}
          <div className="text-xl text-slate-600 space-y-1">
            <p>Let&apos;s apply what you learned about</p>
            <p className="font-bold text-indigo-500">{conceptTitle}</p>
            <p>with some practice questions.</p>
          </div>

          {/* Feature List */}
          <div className="w-full bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-2 border-indigo-100">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-indigo-200/50 rounded-xl flex items-center justify-center text-2xl mb-1">
                📝
              </div>
              <span className="font-semibold text-slate-900 text-sm">Multiple Choice</span>
              <span className="text-slate-500 text-xs">Choose the best answer</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-indigo-200/50 rounded-xl flex items-center justify-center text-2xl mb-1">
                ⚡
              </div>
              <span className="font-semibold text-slate-900 text-sm">Instant Feedback</span>
              <span className="text-slate-500 text-xs">Learn as you go</span>
            </div>
             <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-indigo-200/50 rounded-xl flex items-center justify-center text-2xl mb-1">
                💪
              </div>
              <span className="font-semibold text-slate-900 text-sm">Build Skills</span>
              <span className="text-slate-500 text-xs">Practice makes perfect</span>
            </div>
          </div>

          {/* CTA */}
          <Link 
            href={`/module/${moduleId}/concept/${conceptId}/practice/question`}
            className="w-full"
          >
            <Button 
              className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-lg font-semibold h-14 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Practice →
            </Button>
          </Link>

        </div>
      </Card>
    </div>
  );
}







