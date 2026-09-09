import { Coffee, BookOpen, Leaf, Feather, Heart, Star, Sun, Cat } from "lucide-react";

// Preset choices for the admin-customizable sidebar icon (Settings page).
// Keys are stored as plain strings in site_settings.avatarIcon.
export const SIDEBAR_ICONS = {
  Coffee,
  BookOpen,
  Leaf,
  Feather,
  Heart,
  Star,
  Sun,
  Cat,
} as const;

export type SidebarIconKey = keyof typeof SIDEBAR_ICONS;
export const SIDEBAR_ICON_KEYS = Object.keys(SIDEBAR_ICONS) as SidebarIconKey[];

export function isSidebarIconKey(value: string): value is SidebarIconKey {
  return value in SIDEBAR_ICONS;
}
