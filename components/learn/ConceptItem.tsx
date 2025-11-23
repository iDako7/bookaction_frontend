"use client";

import { CheckCircle, Lock, PlayCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCanAccessConceptIntro } from "@/lib/hooks/useGating";
import { ConceptListItem } from "@/lib/types/api";
import { useProgressStore } from "@/lib/state/progressStore";

interface ConceptItemProps {
  moduleId: number;
  concept: ConceptListItem;
  index: number;
}

export function ConceptItem({ moduleId, concept, index }: ConceptItemProps) {
  const orderIndex = index + 1;
  const { canAccess } = useCanAccessConceptIntro(
    moduleId,
    concept.id,
    orderIndex
  );
  
  const isConceptCompleted = useProgressStore((state) => 
    state.isConceptSummaryViewed(moduleId, concept.id)
  );

  // Use local state if available, otherwise fall back to API data
  const isCompleted = isConceptCompleted || concept.completed;

  const href = `/module/${moduleId}/concept/${concept.id}/intro`;

  return (
    <div className="relative z-10">
      <Link
        href={canAccess ? href : "#"}
        className={cn(
          "group flex items-center justify-between rounded-2xl border-2 p-1 pr-4 transition-all",
          canAccess
            ? "border-blue-100 bg-white hover:scale-[1.01] hover:border-blue-200 hover:shadow-md cursor-pointer"
            : "border-slate-100 bg-slate-50/50 cursor-not-allowed opacity-80"
        )}
        onClick={(e) => !canAccess && e.preventDefault()}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl shadow-sm transition-colors",
              isCompleted
                ? "bg-green-500 shadow-md"
                : canAccess
                ? "bg-slate-100 group-hover:bg-blue-50"
                : "bg-slate-200/50"
            )}
          >
            {isCompleted ? (
              <CheckCircle className="h-8 w-8 text-white" />
            ) : !canAccess ? (
              <Lock className="h-6 w-6 text-slate-400" />
            ) : (
              <MessageCircle className="h-8 w-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
            )}
          </div>

          <div>
            <h4
              className={cn(
                "font-semibold text-lg transition-colors",
                canAccess ? "text-slate-800 group-hover:text-blue-700" : "text-slate-400"
              )}
            >
              {concept.title}
            </h4>
            {!canAccess && (
               <p className="text-xs font-medium text-slate-400">🔒 Complete previous step first</p>
            )}
            {canAccess && !isCompleted && (
               <p className="text-xs font-medium text-slate-500 group-hover:text-blue-600">
                 Ready to start
               </p>
            )}
          </div>
        </div>

        {isCompleted ? (
          <div className="mr-2 flex h-10 items-center gap-2 rounded-xl bg-blue-50 border border-blue-100 px-6 font-bold text-blue-600 shadow-sm transition-transform group-hover:translate-x-1">
            Review
          </div>
        ) : canAccess && (
          <PlayCircle className="h-8 w-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
        )}
      </Link>
    </div>
  );
}
