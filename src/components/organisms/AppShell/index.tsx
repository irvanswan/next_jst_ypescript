"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Bell,
  Boxes,
  ChevronLeft,
  Menu,
  Search,
  User
} from "lucide-react";
import { PropsWithChildren } from "react";
import { Input } from "@/components/atoms/ui/Input";
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { menuConfig, menuIcons, type MenuItem } from "@/config/menu";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

type AppShellProps = PropsWithChildren<{
  searchPlaceholder?: string;
}>;

type MenuLinkProps = {
  item: MenuItem;
  active?: boolean;
  collapsed: boolean;
};

function MenuLink({ item, active = false, collapsed }: MenuLinkProps) {
  const t = useTranslations();
  const Icon = menuIcons[item.icon];

  return (
    <Link
      href={item.href}
      className={cn(
        "inline-flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold",
        active ? "bg-brand-50 text-brand-600" : "text-muted-foreground hover:bg-secondary",
        collapsed && "lg:justify-center"
      )}
    >
      <Icon className="size-4" />
      <span className={cn(collapsed && "lg:hidden")}>{t(`nav.${item.key}`)}</span>
    </Link>
  );
}

export function AppShell({ children, searchPlaceholder }: AppShellProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[254px] shrink-0 flex-col justify-between border-r bg-card transition-[transform,width] duration-200 lg:relative lg:translate-x-0",
          sidebarCollapsed && "lg:w-[88px]",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col">
          <div className="relative flex items-center gap-3 px-6 py-6">
            <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-blue-500/25">
              <Boxes className="size-5" />
            </div>
            <div className={cn("min-w-0", sidebarCollapsed && "lg:hidden")}>
              <p className="text-[30px] font-extrabold leading-none tracking-tight">{t("app.name")}</p>
              <p className="text-xs text-muted-foreground">{t("app.suite")}</p>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="absolute -right-4 top-5 hidden size-8 place-items-center rounded-full border bg-card text-muted-foreground hover:bg-secondary lg:grid"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className={cn("size-3 transition-transform", sidebarCollapsed && "rotate-180")} />
            </button>
          </div>
          <nav className="space-y-1 px-4">
            {menuConfig.main.map((item) => (
              <MenuLink key={item.key} item={item} active={pathname === item.href} collapsed={sidebarCollapsed} />
            ))}
          </nav>
        </div>
        <div className="space-y-1 border-t px-4 py-6">
          {menuConfig.footer.map((item) => (
            <MenuLink key={item.key} item={item} collapsed={sidebarCollapsed} />
          ))}
        </div>
      </aside>

      {mobileSidebarOpen ? (
        <button
          className="fixed inset-0 z-40 bg-slate-900/35 lg:hidden"
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-xl border bg-card text-muted-foreground lg:hidden"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </button>
          {searchPlaceholder ? (
            <label className="relative hidden w-full max-w-xl sm:block">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder={searchPlaceholder} className="px-11" />
            </label>
          ) : null}
          <div className="ml-auto flex items-center gap-4 sm:gap-6">
            <button className="relative text-brand-600 transition hover:text-brand-600/80" aria-label="Notifications" type="button">
              <Bell className="size-5" />
              <span className="absolute -right-1 -top-1 size-2 rounded-full bg-brand-500 ring-2 ring-card" />
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden h-7 w-px bg-border sm:block" />
            <div className="relative grid size-10 place-items-center rounded-full border bg-secondary text-muted-foreground">
              <User className="size-5" />
              <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-emerald-500" />
            </div>
          </div>
        </header>

        <div className="content-scroll flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
