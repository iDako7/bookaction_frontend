"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/state/authStore";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthGuardProps {
  children: React.ReactNode;
}

const PUBLIC_PATHS = ["/login", "/register", "/"];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  // Ensure we only use the store values after hydration to match server
  const isAuthenticated = hydrated ? auth.isAuthenticated : false;
  const token = hydrated ? auth.token : null;

  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if current path is public
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if ((!isAuthenticated || !token) && !isPublicPath) {
      router.push("/login");
    } else if (
      isAuthenticated &&
      token &&
      (pathname === "/login" || pathname === "/register")
    ) {
      // Redirect to learn if already logged in and trying to access auth pages
      router.push("/learn");
    }
  }, [isAuthenticated, token, pathname, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHydrated(true);
      setIsChecking(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // If not authenticated and on a protected route, don't render children
  // (The useEffect will handle the redirect, but we prevent flash of content)
  if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}

