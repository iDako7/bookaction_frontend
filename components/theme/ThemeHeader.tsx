"use client";

import { ModuleTheme } from "@/lib/types/api";
import { Skeleton } from "@/components/ui/skeleton";

interface ThemeHeaderProps {
  title: string;
  theme: ModuleTheme;
  isLoading?: boolean;
}

export function ThemeHeader({ title, theme, isLoading }: ThemeHeaderProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 mb-8">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </h2>
        <h1 className="text-3xl font-bold tracking-tight">{theme.title}</h1>
      </div>

      {/* Media Placeholder - In real app, use theme.mediaUrl */}
      <div className="aspect-video w-full bg-muted rounded-xl flex items-center justify-center overflow-hidden relative">
        {theme.mediaUrl ? (
           // eslint-disable-next-line @next/next/no-img-element
           <img 
             src={theme.mediaUrl} 
             alt={theme.title}
             className="w-full h-full object-cover"
           />
        ) : (
          <span className="text-muted-foreground">Theme Image</span>
        )}
      </div>
    </div>
  );
}
