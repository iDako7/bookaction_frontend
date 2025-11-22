"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCanAccessConceptIntro } from "@/lib/hooks/useGating";
import { ConceptListItem } from "@/lib/types/api";

interface ConceptItemProps {
  moduleId: number;
  concept: ConceptListItem;
  index: number;
}

export function ConceptItem({ moduleId, concept, index }: ConceptItemProps) {
  // order_index is 1-based, index is 0-based
  const orderIndex = index + 1;
  const { canAccess } = useCanAccessConceptIntro(
    moduleId,
    concept.id,
    orderIndex
  );

  const href = `/module/${moduleId}/concept/${concept.id}/intro`;

  return (
    <div className="relative pl-8 py-2">
      {/* Connector line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-border" />

      <Link
        href={canAccess ? href : "#"}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border bg-card transition-colors",
          canAccess
            ? "hover:bg-accent hover:text-accent-foreground cursor-pointer"
            : "opacity-60 cursor-not-allowed bg-muted/50"
        )}
        onClick={(e) => !canAccess && e.preventDefault()}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border",
              concept.completed
                ? "bg-green-100 border-green-200 text-green-600"
                : canAccess
                ? "bg-primary/10 border-primary/20 text-primary"
                : "bg-muted border-muted-foreground/20 text-muted-foreground"
            )}
          >
            {concept.completed ? (
              <CheckCircle className="w-5 h-5" />
            ) : !canAccess ? (
              <Lock className="w-4 h-4" />
            ) : (
              <span className="text-sm font-medium">{orderIndex}</span>
            )}
          </div>
          <div>
            <h4 className="font-medium text-sm">{concept.title}</h4>
            {!canAccess && (
              <p className="text-xs text-muted-foreground">
                Complete previous steps to unlock
              </p>
            )}
          </div>
        </div>

        {canAccess && !concept.completed && (
          <PlayCircle className="w-5 h-5 text-muted-foreground" />
        )}
      </Link>
    </div>
  );
}
