"use client";

import { use } from "react";
import Link from "next/link";
import { useModulesOverview } from "@/lib/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function ModuleCompletionPage({ params }: PageProps) {
  const { moduleId } = use(params);
  const numericModuleId = parseInt(moduleId, 10);
  
  const { data: modulesOverview, isLoading } = useModulesOverview();
  const currentModule = modulesOverview?.modules.find(m => m.id === numericModuleId);

  if (isLoading || !currentModule) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <Skeleton className="h-[600px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50/50 p-6 md:p-8 flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-white border-blue-100 shadow-sm overflow-visible rounded-2xl relative">
        
        {/* Trophy Icon - Positioned absolutely */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-32 h-32 bg-gradient-to-b from-indigo-300 to-indigo-200 rounded-full flex items-center justify-center shadow-xl border-8 border-white text-5xl">
            🏆
          </div>
        </div>

        {/* Floating Confetti decorations (simplified as CSS elements or just text for MVP) */}
        <div className="absolute top-4 left-16 text-3xl animate-bounce delay-100">🎉</div>
        <div className="absolute top-4 right-16 text-3xl animate-bounce delay-700">🎉</div>

        <div className="pt-24 pb-10 px-8 md:px-12 space-y-10 text-center">
          
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
              Module Complete!
            </h1>
            <div className="text-xl text-slate-600">
              <p>Congratulations on completing</p>
              <p className="font-bold text-indigo-500 text-2xl mt-1">{currentModule.title}</p>
            </div>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex flex-col items-center gap-2">
              <span className="text-3xl">✨</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Skills Gained</span>
            </div>
            <div className="bg-green-50 border border-green-100 p-4 rounded-2xl flex flex-col items-center gap-2">
              <span className="text-3xl">🎯</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Goals Achieved</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex flex-col items-center gap-2">
              <span className="text-3xl">🚀</span>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Ready to Apply</span>
            </div>
          </div>

          {/* Message */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
            <p className="text-lg text-slate-700 font-medium leading-relaxed">
              You&apos;ve taken an important step in building stronger, healthier relationships. Keep practicing what you&apos;ve learned!
            </p>
          </div>

          {/* Footer Action */}
          <Link href="/learn" className="block w-full pt-4">
            <Button 
              className="w-full bg-gradient-to-b from-blue-400 to-sky-400 hover:from-blue-500 hover:to-sky-500 text-white text-xl font-semibold h-16 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Continue Your Journey →
            </Button>
          </Link>

        </div>
      </Card>
    </div>
  );
}









