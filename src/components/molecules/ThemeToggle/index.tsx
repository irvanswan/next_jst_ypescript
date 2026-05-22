"use client";

import { Moon, Sun } from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-16 items-center rounded-full border bg-secondary p-1 text-primary"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <Sun className="absolute left-2 size-3 opacity-70" />
      <Moon className="absolute right-2 size-3 opacity-60" />
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full bg-card shadow-sm transition-transform duration-200",
          isDark && "translate-x-[26px] bg-primary text-primary-foreground"
        )}
      >
        {isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
      </span>
    </button>
  );
}
