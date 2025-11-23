"use client";

import Link from "next/link";
import { BookOpen, CheckCircle, MessageCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleOverviewItem } from "@/lib/types/api";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ConceptList } from "./ConceptList";
import { useModuleStats } from "@/lib/hooks/useGating";

interface ModuleItemProps {
  module: ModuleOverviewItem;
}

export function ModuleItem({ module }: ModuleItemProps) {
  const stats = useModuleStats(module.id);
  
  // Theme is always the first step
  const themeHref = `/module/${module.id}/theme`;
  const isThemeCompleted = stats?.isThemeViewed;
  const isThemeUnlocked = true; // Theme is always unlocked

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-50 bg-white shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0px_20px_40px_-5px_rgba(0,0,0,0.05)]">
      {/* Decorative Background Elements */}
      <div className="absolute right-0 top-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-gradient-to-br from-blue-50 to-transparent opacity-50 blur-3xl" />
      
      <div className="relative p-8">
        {/* Header Section */}
        <div className="mb-8 flex items-start gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-blue-400 to-sky-400 shadow-lg shadow-blue-500/20">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{module.title}</h3>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
               <span>{module.concepts.length} lessons</span>
               <span>•</span>
               <span>{stats?.percentage || 0}% complete</span>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 max-w-md">
              <div className="h-3 w-full overflow-hidden rounded-full bg-blue-50">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-sky-400 transition-all duration-500 ease-out"
                  style={{ width: `${stats?.percentage || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="relative space-y-4 pl-6">
          {/* Vertical Connector Line */}
          <div className="absolute left-[60px] top-8 bottom-8 w-0.5 bg-slate-100" />

          {/* Theme Row (Special Styling) */}
          <div className="relative z-10">
             <Link
              href={themeHref}
              className="group flex items-center justify-between rounded-2xl border-2 border-[#FEE685] bg-gradient-to-r from-[#FFFBEB] to-[#FFF7ED] p-1 pr-4 transition-all hover:scale-[1.01] hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  {isThemeCompleted ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[#FEE685]/50 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-yellow-700" />
                    </div>
                  )}
                </div>
                
                <div>
                   <div className="flex items-center gap-2 mb-1">
                     <span className="font-semibold text-slate-800 text-lg">Module Theme</span>
                     <span className="rounded-full bg-gradient-to-r from-orange-400 to-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                       Story
                     </span>
                   </div>
                   <p className="text-sm font-medium text-slate-600">{module.theme.title}</p>
                </div>
              </div>
              
              {!isThemeCompleted && (
                 <div className="mr-2 flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 px-6 font-bold text-white shadow-md shadow-orange-500/20 transition-transform group-hover:translate-x-1">
                   Start
                 </div>
              )}
            </Link>
          </div>

          {/* Concepts List */}
          <ConceptList moduleId={module.id} concepts={module.concepts} />
          
          {/* Reflection (Last Step) */}
          <div className="relative z-10">
             <Link
               href={`/module/${module.id}/reflection`}
               className={cn(
                 "group flex items-center justify-between rounded-2xl border-2 p-1 pr-4 transition-all",
                 stats?.completedConcepts === stats?.totalConcepts
                   ? "border-blue-100 bg-white hover:scale-[1.01] hover:border-blue-200 hover:shadow-md cursor-pointer"
                   : "border-slate-100 bg-slate-50/50 cursor-not-allowed opacity-80"
               )}
               onClick={(e) => stats?.completedConcepts !== stats?.totalConcepts && e.preventDefault()}
             >
               <div className="flex items-center gap-4">
                 <div className={cn(
                   "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl shadow-sm",
                   stats?.isReflectionViewed 
                    ? "bg-green-100" 
                    : "bg-slate-200/50"
                 )}>
                   {stats?.isReflectionViewed ? (
                      <CheckCircle className="h-8 w-8 text-green-600" />
                   ) : stats?.completedConcepts === stats?.totalConcepts ? (
                      <MessageCircle className="h-8 w-8 text-blue-400" />
                   ) : (
                      <Lock className="h-6 w-6 text-slate-400" />
                   )}
                 </div>
                 
                 <div>
                   <h4 className={cn(
                     "font-semibold text-lg",
                     stats?.completedConcepts === stats?.totalConcepts ? "text-slate-800" : "text-slate-400"
                   )}>
                     Reflection
                   </h4>
                   {stats?.completedConcepts !== stats?.totalConcepts && (
                     <p className="text-xs font-medium text-slate-400">🔒 Complete previous lessons</p>
                   )}
                 </div>
               </div>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
