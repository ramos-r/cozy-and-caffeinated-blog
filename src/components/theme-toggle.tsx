"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ThemeToggle({ className }: { className?: string }) {
  // Resolved client-side only (see the inline script in layout.tsx) — starts
  // null so the server-rendered markup never guesses a theme and mismatches.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage can throw in private/locked-down browsers — theme just
      // won't persist across visits, which is fine.
    }
    setDark(next);
  }

  if (dark === null) {
    return <span className={cn("inline-block h-9 w-9", className)} aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "rounded-md p-2 text-muted-foreground transition-colors hover:bg-background hover:text-accent",
        focusRing,
        className,
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
