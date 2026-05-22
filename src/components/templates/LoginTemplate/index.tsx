"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/atoms/ui/Button";
import { Input } from "@/components/atoms/ui/Input";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { useUiStore } from "@/store/ui-store";

export function LoginTemplate() {
  const t = useTranslations();
  const theme = useUiStore((state) => state.theme);
  const toggleTheme = useUiStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(37,99,235,0.22),transparent_34%),linear-gradient(180deg,#e8edf7_0%,#e1e7f2_100%)] dark:bg-[radial-gradient(circle_at_10%_10%,rgba(47,102,232,0.22),transparent_35%),radial-gradient(circle_at_90%_20%,rgba(14,165,233,0.14),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggleTheme}
          className="relative inline-flex h-9 w-16 items-center rounded-full border bg-card/80 p-1 text-primary shadow-lg shadow-slate-900/5 backdrop-blur-sm"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Sun className="absolute left-2 size-3" />
          <Moon className="absolute right-2 size-3 opacity-60" />
          <span className={`grid size-7 place-items-center rounded-full bg-card shadow-sm transition-transform ${isDark ? "translate-x-[26px] bg-primary text-primary-foreground" : ""}`}>
            {isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
          </span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[36vw] min-w-[280px] max-w-[430px] opacity-75 md:block" aria-hidden="true">
        <svg viewBox="0 0 420 1200" className="line-drift h-full w-full" preserveAspectRatio="none" fill="none">
          <path d="M310 40C210 150 120 340 110 520C100 700 205 830 280 905C350 975 385 1100 245 1200" stroke="#b6caf0" strokeWidth="2" />
          <path d="M410 120C300 245 215 430 215 610C215 790 305 905 365 980C445 1080 495 1160 360 1200" stroke="#c5d4f3" strokeWidth="2" />
        </svg>
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <header className="rise mb-6 text-center">
          <div className="mx-auto mb-3 grid size-14 place-items-center rounded-xl bg-primary p-2 shadow-lg shadow-blue-500/30">
            <Image src="/assets/logo.png" alt="Logo" width={48} height={48} className="h-full w-full object-contain" priority />
          </div>
          <h1 className="text-balance text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-50 sm:text-3xl">{t("app.company")}</h1>
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">{t("app.portal")}</p>
        </header>

        <div className="rise w-full max-w-lg rounded-3xl border border-white/70 bg-card/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-card-foreground">{t("login.welcome")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("login.subtitle")}</p>

          <form className="mt-7 space-y-4">
            <label className="block text-sm font-semibold text-muted-foreground">
              {t("login.email")}
              <Input type="email" className="mt-2" placeholder="name@enterprise.com" required />
            </label>
            <label className="block text-sm font-semibold text-muted-foreground">
              {t("login.password")}
              <Input type="password" className="mt-2" placeholder="********" required />
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                {t("login.remember")}
              </label>
              <Link href="#" className="font-semibold text-brand-600 transition hover:text-brand-500">
                {t("login.forgot")}
              </Link>
            </div>

            <Button className="w-full" asChild>
              <Link href="/dashboard">{t("login.submit")}</Link>
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Do not have an account?{" "}
            <Link href="#" className="font-semibold text-brand-600 transition hover:text-brand-500">
              {t("login.contact")}
            </Link>
          </p>
        </div>
      </section>

      <footer className="rise z-10 flex w-full flex-wrap items-center justify-center gap-3 border-t border-slate-200/80 bg-slate-50/85 px-4 py-4 text-sm text-slate-500 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <p>{t("login.learn")}</p>
        <Link href="https://www.larantika.com" className="rounded-xl border bg-card px-4 py-2 font-semibold text-brand-600 transition hover:bg-brand-50">
          {t("login.website")}
        </Link>
      </footer>
    </main>
  );
}
