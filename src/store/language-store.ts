"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultLocale, type Locale } from "@/i18n/routing";

type LanguageState = {
  language: Locale;
  setLanguage: (language: Locale) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: defaultLocale,
      setLanguage: (language) => set({ language })
    }),
    {
      name: "core-admin-language",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          throw new Error("Storage is only available in the browser.");
        }

        return sessionStorage;
      })
    }
  )
);
