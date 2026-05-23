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
import { PropsWithChildren, useEffect, useRef, useState } from "react";
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
      {Icon ? <Icon className="size-4" /> : <span className="size-4" aria-hidden />}
      <span className={cn(collapsed && "lg:hidden")}>{t(`nav.${item.key}`)}</span>
    </Link>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function AppShell({ children, searchPlaceholder }: AppShellProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setMobileSidebarOpen = useUiStore((state) => state.setMobileSidebarOpen);
  const [menuQuery, setMenuQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const normalizedQuery = menuQuery.trim().toLowerCase();

  const matchesMenu = (item: MenuItem) => {
    if (!normalizedQuery) {
      return true;
    }

    const label = t(`nav.${item.key}`);

    return label.toLowerCase().includes(normalizedQuery) || item.key.toLowerCase().includes(normalizedQuery);
  };

  const mainItems = menuConfig.main.filter(matchesMenu);
  const footerItems = menuConfig.footer.items.filter(matchesMenu);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              className="absolute -right-4 top-5 cursor-pointer hidden size-8 place-items-center rounded-full border bg-card text-muted-foreground hover:bg-secondary lg:grid"
              aria-label="Toggle sidebar"
            >
              <ChevronLeft className={cn("size-3 transition-transform", sidebarCollapsed && "rotate-180")} />
            </button>
          </div>
          <div className={cn("px-4 pb-4", sidebarCollapsed && "lg:hidden")}>
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={menuQuery}
                onChange={(event) => setMenuQuery(event.target.value)}
                placeholder="Search menu"
                className="h-10 rounded-xl px-9"
              />
            </label>
          </div>
          <nav className="space-y-1 px-4">
            {mainItems.map((item) => (
              <MenuLink key={item.key} item={item} active={pathname === item.href} collapsed={sidebarCollapsed} />
            ))}
          </nav>
        </div>
        <div className="space-y-4 border-t px-4 py-6">
          <div className="space-y-1">
            {footerItems.map((item) => (
              <MenuLink key={item.key} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl border bg-card px-3 py-3",
              sidebarCollapsed && "lg:justify-center"
            )}
          >
            {menuConfig.footer.profile.avatarUrl ? (
              <img
                src={menuConfig.footer.profile.avatarUrl}
                alt={menuConfig.footer.profile.name}
                className="size-9 rounded-full border object-cover"
              />
            ) : (
              <div className="grid size-9 place-items-center rounded-full border bg-secondary text-xs font-semibold text-foreground">
                {getInitials(menuConfig.footer.profile.name)}
              </div>
            )}
            <div className={cn("min-w-0", sidebarCollapsed && "lg:hidden")}>
              <p className="truncate text-sm font-semibold text-foreground">{menuConfig.footer.profile.name}</p>
              <p className="truncate text-xs text-muted-foreground">{menuConfig.footer.profile.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {mobileSidebarOpen ? (
        <button
          className="fixed inset-0 cusor-pointer z-40 bg-slate-900/35 lg:hidden"
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
            <label className="relative hidden w-full max-w-xl lg:block">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder={searchPlaceholder} className="px-11" />
            </label>
          ) : null}
          <div className="ml-auto flex items-center gap-4 sm:gap-6">
            <div className="relative" ref={notificationsRef}>
              <button
                className="relative text-brand-600 transition hover:text-brand-600/80"
                aria-label="Notifications"
                type="button"
                onClick={() => {
                  setNotificationsOpen((open) => !open);
                  setProfileOpen(false);
                }}
              >
                <Bell className="size-5" />
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-brand-500 ring-2 ring-card" />
              </button>
              {notificationsOpen ? (
                <div className="absolute right-0 z-50 mt-3 w-72 rounded-2xl border bg-card p-4 shadow-xl">
                  <p className="text-sm font-semibold text-foreground">Notifications</p>
                  <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                    <div className="rounded-xl border bg-background px-3 py-2">
                      <p className="font-medium text-foreground">New task assigned</p>
                      <p className="text-xs">2 minutes ago</p>
                    </div>
                    <div className="rounded-xl border bg-background px-3 py-2">
                      <p className="font-medium text-foreground">Deal updated</p>
                      <p className="text-xs">1 hour ago</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden h-7 w-px bg-border sm:block" />
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="relative grid size-10 place-items-center rounded-full border bg-secondary text-muted-foreground"
                aria-label="Open profile menu"
                onClick={() => {
                  setProfileOpen((open) => !open);
                  setNotificationsOpen(false);
                }}
              >
                <User className="size-5" />
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-emerald-500" />
              </button>
              {profileOpen ? (
                <div className="absolute right-0 z-50 mt-3 w-60 rounded-2xl border bg-card p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    {menuConfig.footer.profile.avatarUrl ? (
                      <img
                        src={menuConfig.footer.profile.avatarUrl}
                        alt={menuConfig.footer.profile.name}
                        className="size-10 rounded-full border object-cover"
                      />
                    ) : (
                      <div className="grid size-10 place-items-center rounded-full border bg-secondary text-xs font-semibold text-foreground">
                        {getInitials(menuConfig.footer.profile.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{menuConfig.footer.profile.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{menuConfig.footer.profile.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <Link href="#" className="block rounded-lg px-2 py-2 font-medium text-foreground hover:bg-secondary">
                      My Profile
                    </Link>
                    <Link href="#" className="block rounded-lg px-2 py-2 font-medium text-foreground hover:bg-secondary">
                      My Activity
                    </Link>
                    <Link href="/login" className="block rounded-lg px-2 py-2 font-medium text-brand-600 hover:bg-secondary">
                      Logout
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="content-scroll flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
