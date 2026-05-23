import { icons, type LucideIcon } from "lucide-react";
import menu from "./menu.json";

type MenuIcon = keyof typeof icons;

export type MenuItem = {
  key:
    | "companies"
    | "dashboard"
    | "deals"
    | "kontak"
    | "penawaran"
    | "product"
    | "properties"
    | "purchaseOrder"
    | "task";
  href: string;
  icon: MenuIcon;
};

export type MenuProfile = {
  name: string;
  role: string;
  avatarUrl?: string;
};

export type MenuConfig = {
  main: MenuItem[];
  footer: {
    items: MenuItem[];
    profile: MenuProfile;
  };
};

export const menuConfig = menu as MenuConfig;

export const menuIcons: Record<MenuIcon, LucideIcon> = icons;
