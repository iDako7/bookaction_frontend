"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useConceptSummary, useUpdateConceptProgress, useConceptTutorial, useModulesOverview } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{
    moduleId: string;
    conceptId: string;
  }>;
}

export default function ConceptSummaryPage({ params }: PageProps) {
  const { moduleId, conceptId } = use(params);
  const numericModuleId = parseInt(moduleId, 10);
  const numericConceptId = parseInt(conceptId, 10);

  const { data: summary, isLoading: isSummaryLoading } = useConceptSummary(numericConceptId);
  const { data: tutorial, isLoading: isTutorialLoading } = useConceptTutorial(numericConceptId);
  const { data: modulesData } = useModulesOverview();
  const updateProgress = useUpdateConceptProgress(numericConceptId);
  const markSummaryViewed = useProgressStore((state) => state.markConceptSummaryViewed);

  // Calculate next step
  let nextHref = "/learn"; // default fallback
  if (modulesData?.modules) {
    const module = modulesData.modules.find(m => m.id === numericModuleId);
    if (module) {
      const conceptIndex = module.concepts.findIndex(c => c.id === numericConceptId);
      if (conceptIndex !== -1) {
        if (conceptIndex < module.concepts.length - 1) {
          // Has next concept
          const nextConcept = module.concepts[conceptIndex + 1];
          nextHref = `/module/${numericModuleId}/concept/${nextConcept.id}/intro`;
        } else {
          // Last concept, go to reflection
          nextHref = `/module/${numericModuleId}/reflection`;
        }
      }
    }
  }

  useEffect(() => {
    if (summary) {
      // Mark summary as viewed locally
      markSummaryViewed(numericModuleId, numericConceptId);
      // Update backend progress to complete
      updateProgress.mutate({
        userId: 1,
        isCompleted: true,
      });
    }
  }, [summary, numericModuleId, numericConceptId, markSummaryViewed, updateProgress.mutate]);

  if (isSummaryLoading || isTutorialLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    );
  }

  // Split summary content into bullet points if it contains newlines or distinct sentences
  const summaryPoints = summary?.summaryContent
    ? summary.summaryContent.split('. ').filter(Boolean).map(s => s.trim().endsWith('.') ? s : s + '.')
    : ["Great job completing this concept!"];

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8 flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-white border-blue-100 shadow-sm rounded-2xl relative overflow-visible">
        
        {/* Success Icon - Positioned absolutely to overlap top border like design */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-24 h-24 bg-[#05df72] rounded-full flex items-center justify-center shadow-lg ring-8 ring-white">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>

        <div className="pt-20 pb-10 px-8 md:px-12 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3 mt-4">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Concept Complete! 🎉
            </h1>
            <p className="text-xl text-slate-600">
              Great job learning about <span className="font-bold text-indigo-500">{tutorial?.title}</span>
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl text-indigo-600">
                💡
              </div>
              <h3 className="text-xl font-bold text-slate-900">Key Takeaways</h3>
            </div>

            <div className="space-y-6">
              {summaryPoints.map((point, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 flex gap-5 items-start"
                >
                  <div className="w-8 h-8 bg-indigo-200 rounded-lg flex items-center justify-center shrink-0 text-indigo-700 font-bold text-sm mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed text-lg">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Teaser / Next Step */}
          {summary?.nextConceptIntro && (
            <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-8 flex gap-5 items-start">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl shrink-0 text-amber-600">
                🎯
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-lg">Try This Today</h4>
                <p className="text-slate-700 text-lg leading-relaxed">
                  {summary.nextConceptIntro}
                </p>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <Link href={nextHref} className="block w-full pt-4">
            <Button 
              className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-xl font-semibold h-16 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Continue Learning →
            </Button>
          </Link>

        </div>
      </Card>
    </div>
  );
}
