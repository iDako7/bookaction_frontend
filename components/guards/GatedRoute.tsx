"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface GatedRouteProps {
  canAccess: boolean;
  redirectTo?: string;
  reason?: string;
  children: React.ReactNode;
}

/**
 * Component to gate access to routes based on progress
 * Redirects user if they don't have access
 */
export function GatedRoute({
  canAccess,
  redirectTo,
  reason,
  children,
}: GatedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (!canAccess && redirectTo) {
      console.log(`Gating: ${reason || "Access denied"} - redirecting to ${redirectTo}`);
      router.push(redirectTo);
    }
  }, [canAccess, redirectTo, reason, router]);

  if (!canAccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
        <p className="text-muted-foreground mb-6">
          {reason || "You need to complete previous steps first."}
        </p>
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}












