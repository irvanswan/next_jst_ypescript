"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Theme = "light" | "dark";

type UiState = {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  theme: Theme;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      theme: "light",
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" }))
    }),
    {
      name: "core-admin-ui",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          throw new Error("Storage is only available in the browser.");
        }

        return localStorage;
      }),
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme
      })
    }
  )
);
