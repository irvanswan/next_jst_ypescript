"use client";

import { Languages } from "lucide-react";
import { locales, type Locale } from "@/i18n/routing";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const selectedLanguage = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const switchLanguage = (nextLocale: Locale) => {
    setLanguage(nextLocale);
  };

  return (
    <div className="inline-flex h-9 items-center gap-1 rounded-xl border bg-secondary p-1 text-xs font-extrabold text-muted-foreground">
      <Languages className="ml-2 size-4 text-primary" />
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchLanguage(locale)}
          className={cn(
            "h-7 rounded-lg px-2 uppercase transition",
            selectedLanguage === locale ? "bg-card text-card-foreground shadow-sm" : "hover:bg-card/70"
          )}
          aria-pressed={selectedLanguage === locale}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
