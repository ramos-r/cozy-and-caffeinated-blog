"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// A tiny external store around document.documentElement's "dark" class —
// useSyncExternalStore (rather than useEffect+useState) is the pattern React
// recommends for syncing with a browser API like this, and every mounted
// ThemeToggle instance re-renders together when one of them calls setDarkMode.
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

function setDarkMode(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // localStorage can throw in private/locked-down browsers — theme just
    // won't persist across visits, which is fine.
  }
  listeners.forEach((listener) => listener());
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ThemeToggle({ className }: { className?: string }) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setDarkMode(!dark)}
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
