"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useModuleReflection, useSubmitModuleReflection, useModulesOverview } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/state/authStore";

interface PageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ReflectionPage({ params }: PageProps) {
  const { moduleId } = use(params);
  const numericModuleId = parseInt(moduleId, 10);
  const router = useRouter();

  const { data: reflection, isLoading: isReflectionLoading } = useModuleReflection(numericModuleId);
  const { data: modulesOverview } = useModulesOverview();
  const submitReflection = useSubmitModuleReflection(numericModuleId);
  const markReflectionViewed = useProgressStore((state) => state.markReflectionViewed);
  const markModuleCompleted = useProgressStore((state) => state.markModuleCompleted);
  const userId = useAuthStore((state) => state.user?.id ?? 1);

  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentModule = modulesOverview?.modules.find(m => m.id === numericModuleId);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setIsSubmitting(true);
    
    // 1. Mark as viewed/completed locally
    markReflectionViewed(numericModuleId);
    markModuleCompleted(numericModuleId); // Module is complete after reflection

    // 2. Submit to backend
    try {
      await submitReflection.mutateAsync({
        userId,
        answer,
        timeSpent: 60, // Mock time
      });
      
      // 3. Navigate to completion page
      router.push(`/module/${moduleId}/complete`);
    } catch (error) {
      console.error("Failed to submit reflection", error);
      setIsSubmitting(false);
    }
  };

  if (isReflectionLoading || !currentModule) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <Skeleton className="h-[800px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8 flex items-center justify-center">
      <Card className="max-w-3xl w-full bg-white border-blue-100 shadow-sm overflow-visible rounded-2xl relative">
        
        {/* Floating Header Icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-24 h-24 bg-gradient-to-b from-indigo-300 to-indigo-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-4xl">
            🤔
          </div>
        </div>

        <div className="pt-16 pb-10 px-8 md:px-12 space-y-8">
          
          {/* Header Text */}
          <div className="text-center space-y-4 mt-4">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 px-4 py-1.5 text-sm font-semibold rounded-full border-none">
              💭 Reflection Time
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                Reflect on Your Learning
              </h1>
              <p className="text-xl text-slate-600">
                You&apos;ve completed <span className="font-bold text-indigo-500">{currentModule.title}</span>!
              </p>
            </div>
          </div>

          {/* Reflection Image */}
          {reflection?.mediaUrl && (
            <div className="rounded-2xl overflow-hidden shadow-md aspect-video relative bg-slate-100 mx-auto w-full max-w-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={reflection.mediaUrl} 
                alt="Reflection Context"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Reflection Question */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 md:p-8 rounded-2xl border-2 border-indigo-100 flex gap-5 items-start">
            <div className="w-12 h-12 bg-gradient-to-b from-indigo-300 to-indigo-200 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm">
              <span className="text-white">?</span> {/* Using text/symbol instead of raw image for simplicity if generic icon */}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Reflection Question</h3>
              <p className="text-slate-700 text-lg leading-relaxed">
                {reflection?.prompt}
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-slate-900">Your Thoughts</label>
            <Textarea
              placeholder="Take a moment to reflect on what you've learned and how you'll apply it..."
              className="min-h-[200px] text-lg p-6 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 resize-none"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <span>💡</span> Tip: Writing down your thoughts helps solidify your learning
            </p>
          </div>

          {/* Tips Section */}
          <div className="bg-amber-50 border-2 border-amber-100 rounded-2xl p-6 md:p-8 flex gap-5 items-start">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl shrink-0 text-amber-600">
              💡
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 text-lg">Reflection Tips</h4>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-2">
                  <span className="block w-1.5 h-1.5 bg-amber-400 rounded-full mt-2.5 shrink-0" />
                  Consider a specific conversation where you felt misunderstood.
                </li>
                <li className="flex gap-2">
                  <span className="block w-1.5 h-1.5 bg-amber-400 rounded-full mt-2.5 shrink-0" />
                  Reflect on how you could have used the skills you just learned.
                </li>
                <li className="flex gap-2">
                  <span className="block w-1.5 h-1.5 bg-amber-400 rounded-full mt-2.5 shrink-0" />
                  Think about paying attention to non-verbal cues.
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={!answer.trim() || isSubmitting}
            className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-xl font-semibold h-14 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
          >
            {isSubmitting ? "Completing..." : "Complete Module →"}
          </Button>

        </div>
      </Card>
    </div>
  );
}
