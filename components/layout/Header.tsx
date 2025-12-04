"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, User } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-blue-400 to-sky-400 shadow-lg shadow-blue-500/20">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <Link
              href="/learn"
              className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400"
            >
              BookAction
            </Link>
            <span className="text-xs font-medium text-slate-500">
              Level Up Your Relationships 🚀
            </span>
          </div>
        </div>

        {/* Navigation Toggle */}
        <nav className="flex items-center rounded-2xl bg-slate-100 p-1">
          <Link
            href="/learn"
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all",
              pathname?.startsWith("/learn") || pathname === "/"
                ? "bg-gradient-to-b from-blue-400 to-sky-400 text-white shadow-md shadow-blue-500/20"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <BookOpen className="h-4 w-4" />
            Learn
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all",
              pathname === "/profile"
                ? "bg-gradient-to-b from-blue-400 to-sky-400 text-white shadow-md shadow-blue-500/20"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
