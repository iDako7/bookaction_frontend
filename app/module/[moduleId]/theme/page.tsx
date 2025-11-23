"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useModuleTheme, useModulesOverview } from "@/lib/hooks/useApi";
import { useProgressStore } from "@/lib/state/progressStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ModuleThemePage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { moduleId } = use(params);
  const numericModuleId = parseInt(moduleId, 10);

  const { data: theme, isLoading: isThemeLoading } = useModuleTheme(numericModuleId);
  const { data: modulesOverview, isLoading: isOverviewLoading } = useModulesOverview();
  const markThemeViewed = useProgressStore((state) => state.markThemeViewed);

  useEffect(() => {
    if (numericModuleId) {
      markThemeViewed(numericModuleId);
    }
  }, [numericModuleId, markThemeViewed]);

  if (isThemeLoading || isOverviewLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  if (!theme || !modulesOverview) {
    return <div className="p-6 text-center">Module not found</div>;
  }

  const currentModule = modulesOverview.modules.find((m) => m.id === numericModuleId);
  const firstConceptId = currentModule?.concepts[0]?.id;

  // Fallback media if theme.mediaUrl is empty or missing
  const mediaUrl = theme.mediaUrl || "/media/panda.png";

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Navigation */}
        <Link
          href="/learn"
          className="inline-flex items-center text-indigo-500 hover:text-indigo-600 font-semibold mb-6 transition-colors"
        >
          ← Back to Learn
        </Link>

        <Card className="bg-white border-blue-100 shadow-sm overflow-hidden rounded-2xl">
          <div className="p-8 md:p-10 space-y-8">
            {/* Header Section */}
            <div className="space-y-6 text-center relative">
              <Badge 
                variant="secondary" 
                className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-4 py-1.5 text-sm font-semibold rounded-full"
              >
                🎯 Module Story
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {theme.title}
              </h1>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-md aspect-video relative bg-slate-100">
              {/* Using a simple img tag as per design context, but Next.js Image is better for production. 
                  For MVP/Mock with local assets, img is fine or Next Image if configured. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={mediaUrl} 
                alt={theme.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Story Text */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">
                {theme.context}
              </p>
            </div>

            {/* Reflection Question Box */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 border-2 border-indigo-100">
              <div className="flex gap-5 items-start">
                <div className="bg-gradient-to-b from-indigo-300 to-indigo-200 p-3 rounded-xl shadow-sm shrink-0 w-12 h-12 flex items-center justify-center text-2xl">
                  🤔
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 text-base">
                    Reflection Question
                  </h3>
                  <p className="text-slate-700 italic text-lg">
                    {theme.question}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {firstConceptId ? (
              <div className="pt-4">
                <Link href={`/module/${numericModuleId}/concept/${firstConceptId}/intro`} className="block w-full">
                  <Button 
                    className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-lg font-semibold h-14 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Start First Concept
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center text-slate-500">
                No concepts available for this module.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

