"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useConceptTutorial, useUpdateConceptProgress } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    moduleId: string;
    conceptId: string;
  }>;
}

// Step components to handle different content layouts
const DefinitionStep = ({ data }: { data: any }) => (
  <div className="space-y-8">
    <div className="relative pt-4 pb-2">
      <Badge 
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-4 py-1.5 text-sm font-semibold rounded-full"
      >
        📚 Definition
      </Badge>
      <h2 className="text-2xl font-bold text-center text-slate-900 mt-4">
        {data.title}
      </h2>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <p className="text-lg text-slate-700 leading-relaxed">
        {data.definition}
      </p>
    </div>

    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 border-2 border-indigo-100">
      <div className="flex gap-5 items-start">
        <div className="bg-gradient-to-b from-indigo-300 to-indigo-200 p-3 rounded-xl shadow-sm shrink-0 w-12 h-12 flex items-center justify-center text-2xl">
          💡
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 text-base">
            Why it works
          </h3>
          <p className="text-slate-700 text-lg leading-relaxed">
            {data.whyItWorks}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ExampleStep = ({ 
  title, 
  badgeText, 
  badgeColorClass, 
  story, 
  mediaUrl 
}: { 
  title: string;
  badgeText: string;
  badgeColorClass: string;
  story: string;
  mediaUrl: string;
}) => (
  <div className="space-y-8">
    <div className="relative pt-4 pb-2">
      <Badge 
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none px-4 py-1.5 text-sm font-semibold rounded-full",
          badgeColorClass
        )}
      >
        {badgeText}
      </Badge>
    </div>

    <div className="rounded-2xl overflow-hidden shadow-md aspect-video relative bg-slate-100 mt-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={mediaUrl || "/media/panda.png"} 
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    <div className={cn(
      "rounded-2xl p-8 border-2",
      badgeText.includes("Good") 
        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" 
        : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
    )}>
      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-800 whitespace-pre-line leading-relaxed">
          {story}
        </p>
      </div>
    </div>
  </div>
);

export default function ConceptIntroPage({ params }: PageProps) {
  const { moduleId, conceptId } = use(params);
  const numericModuleId = parseInt(moduleId, 10);
  const numericConceptId = parseInt(conceptId, 10);
  const router = useRouter();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const { data: tutorial, isLoading } = useConceptTutorial(numericConceptId);
  const updateProgress = useUpdateConceptProgress(numericConceptId);
  const markIntroCompleted = useProgressStore((state) => state.markConceptIntroCompleted);

  // Handle completion when finishing step 3
  const handleComplete = () => {
    markIntroCompleted(numericModuleId, numericConceptId);
    updateProgress.mutate({
      userId: 1, // Mock user ID
      isCompleted: false, // Concept isn't fully done, just intro
    });
    router.push(`/module/${moduleId}/concept/${conceptId}/practice/intro`);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-2 flex-1 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (!tutorial) {
    return <div className="p-6 text-center">Concept tutorial not found</div>;
  }

  const getStepContent = () => {
    switch (step) {
      case 1:
        return <DefinitionStep data={tutorial} />;
      case 2:
        return (
          <ExampleStep
            title="Good Example"
            badgeText="✅ Good Example"
            badgeColorClass="bg-green-100 text-green-700 hover:bg-green-100"
            story={tutorial.tutorial.goodExample.story}
            mediaUrl={tutorial.tutorial.goodExample.mediaUrl}
          />
        );
      case 3:
        return (
          <ExampleStep
            title="Bad Example"
            badgeText="❌ What to Avoid"
            badgeColorClass="bg-red-100 text-red-700 hover:bg-red-100"
            story={tutorial.tutorial.badExample.story}
            mediaUrl={tutorial.tutorial.badExample.mediaUrl}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "What is it?";
      case 2: return "Good Example";
      case 3: return "Bad Example";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 flex-1 rounded-full transition-colors",
                  index + 1 <= step ? "bg-blue-500" : "bg-slate-200"
                )}
              />
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 font-medium">
            Step {step} of {totalSteps}: {getStepTitle()}
          </p>
        </div>

        <Card className="bg-white border-blue-100 shadow-sm overflow-hidden rounded-2xl min-h-[600px] flex flex-col">
          <div className="p-6 md:p-8 flex-1">
            {getStepContent()}
          </div>

          {/* Footer Navigation */}
          <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 h-14 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
              >
                Back
              </Button>
            ) : (
              <Link href={`/module/${moduleId}/theme`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full h-14 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-xl"
                >
                  Back
                </Button>
              </Link>
            )}

            <Button
              onClick={() => {
                if (step < totalSteps) {
                  setStep(step + 1);
                } else {
                  handleComplete();
                }
              }}
              className="flex-1 h-14 text-lg bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              {step === totalSteps ? "Continue to Practice" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}








