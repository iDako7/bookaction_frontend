"use client";

import { useModulesOverview } from "@/lib/hooks/useApi";
import { ModuleItem } from "./ModuleItem";
import { Skeleton } from "@/components/ui/skeleton";

export function ModuleList() {
  const { data, isLoading, error } = useModulesOverview();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="border rounded-xl p-4 space-y-3">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="pt-2">
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-destructive/20 bg-destructive/10 text-destructive rounded-lg">
        Failed to load modules. Please try again.
      </div>
    );
  }

  if (!data?.modules?.length) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No modules found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.modules.map((module) => (
        <ModuleItem key={module.id} module={module} />
      ))}
    </div>
  );
}
