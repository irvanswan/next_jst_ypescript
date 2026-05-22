"use client";

import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren, useEffect } from "react";
import en from "@/messages/en.json";
import id from "@/messages/id.json";
import { useLanguageStore } from "@/store/language-store";

const messages = { en, id };

export function IntlProvider({ children }: PropsWithChildren) {
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <NextIntlClientProvider locale={language} messages={messages[language]} timeZone="Asia/Jakarta">
      {children}
    </NextIntlClientProvider>
  );
}
