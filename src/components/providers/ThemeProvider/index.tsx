"use client";

import { PropsWithChildren, useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useUiStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return children;
}
