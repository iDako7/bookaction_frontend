"use client";

import { ModuleTheme } from "@/lib/types/api";
import { Skeleton } from "@/components/ui/skeleton";

interface ThemeContentProps {
  theme: ModuleTheme;
  isLoading?: boolean;
}

export function ThemeContent({ theme, isLoading }: ThemeContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="pt-4">
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="prose prose-slate max-w-none">
        <p className="text-lg leading-relaxed text-foreground/90">
          {theme.context}
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-primary">Think about this:</h3>
        <p className="text-lg font-medium">{theme.question}</p>
      </div>
    </div>
  );
}
