"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, BookOpen, CheckCircle } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const stats = useModuleStats(module.id);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Theme is always the first step
  const themeHref = `/module/${module.id}/theme`;
  const isThemeCompleted = stats?.isThemeViewed;

  return (
    <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
      {/* Module Header / Summary Card */}
      <div
        className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={toggleExpand}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Module {module.id}
              </span>
              {stats?.isCompleted && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Completed
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold mb-2">{module.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {module.description}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{stats?.percentage || 0}%</span>
                </div>
                <Progress value={stats?.percentage || 0} className="h-2" />
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t bg-muted/30 p-4">
          <div className="space-y-4">
            {/* Theme Row (Special First Step) */}
            <div className="relative pl-8 py-2">
               {/* Connector line to next items */}
               <div className="absolute left-[11px] top-4 bottom-0 w-px bg-border" />
               
               <Link
                href={themeHref}
                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border",
                      isThemeCompleted
                        ? "bg-green-100 border-green-200 text-green-600"
                        : "bg-primary/10 border-primary/20 text-primary"
                    )}
                  >
                    {isThemeCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Theme: {module.theme.title}</h4>
                    <p className="text-xs text-muted-foreground">Start here</p>
                  </div>
                </div>
                {!isThemeCompleted && (
                   <Button size="sm" variant="secondary">Start</Button>
                )}
              </Link>
            </div>

            {/* Concepts List */}
            <ConceptList moduleId={module.id} concepts={module.concepts} />
            
            {/* Reflection (Last Step) */}
            <div className="relative pl-8 py-2">
               <div className="absolute left-[11px] top-0 h-4 w-px bg-border" /> {/* Connector from above */}
               
               <Link
                 href={`/module/${module.id}/reflection`}
                 className={cn(
                   "flex items-center justify-between p-3 rounded-lg border bg-card transition-colors",
                   stats?.completedConcepts === stats?.totalConcepts // Only unlock if all concepts done
                     ? "hover:bg-accent hover:text-accent-foreground cursor-pointer"
                     : "opacity-60 cursor-not-allowed bg-muted/50"
                 )}
                 onClick={(e) => stats?.completedConcepts !== stats?.totalConcepts && e.preventDefault()}
               >
                 <div className="flex items-center gap-3">
                   <div className={cn(
                     "flex items-center justify-center w-8 h-8 rounded-full border",
                     stats?.isReflectionViewed
                        ? "bg-green-100 border-green-200 text-green-600"
                        : "bg-muted border-muted-foreground/20 text-muted-foreground"
                   )}>
                     {stats?.isReflectionViewed ? <CheckCircle className="w-5 h-5" /> : <span className="text-xs">★</span>}
                   </div>
                   <div>
                     <h4 className="font-medium text-sm">Reflection</h4>
                   </div>
                 </div>
               </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
