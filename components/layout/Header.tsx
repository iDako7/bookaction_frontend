"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/learn" className="text-xl font-bold">
          BookAction
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/learn"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname?.startsWith("/learn") || pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Learn
          </Link>
          <Link
            href="/profile"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/profile"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Profile
          </Link>
          <Link
            href="/medal"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/medal" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Medal
          </Link>
        </nav>
      </div>
    </header>
  );
}

