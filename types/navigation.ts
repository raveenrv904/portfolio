import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}
