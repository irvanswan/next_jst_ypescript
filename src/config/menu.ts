import { Clock3, CircleHelp, Grid2X2, LogOut, Package, Users, type LucideIcon } from "lucide-react";
import menu from "./menu.json";

type MenuIcon = "clock" | "grid" | "help" | "logout" | "package" | "users";

export type MenuItem = {
  key: "dashboard" | "history" | "logout" | "products" | "support" | "users";
  href: string;
  icon: MenuIcon;
};

export type MenuConfig = {
  main: MenuItem[];
  footer: MenuItem[];
};

export const menuConfig = menu as MenuConfig;

export const menuIcons: Record<MenuIcon, LucideIcon> = {
  clock: Clock3,
  grid: Grid2X2,
  help: CircleHelp,
  logout: LogOut,
  package: Package,
  users: Users
};
