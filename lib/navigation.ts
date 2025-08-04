import {
  LayoutDashboard,
  FolderOpen,
  Building2,
  Briefcase,
  Code2,
  BookOpen,
  User,
} from "lucide-react";
import { NavigationSection } from "@/types/navigation";

export const navigationSections: NavigationSection[] = [
  {
    items: [
      {
        name: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Portfolio",
    items: [
      {
        name: "Projects",
        href: "/projects",
        icon: FolderOpen,
      },
      {
        name: "Agency",
        href: "/agency",
        icon: Building2,
        badge: "Pro",
      },
    ],
  },
  {
    title: "Journey",
    items: [
      {
        name: "Experiences",
        href: "/experiences",
        icon: Briefcase,
      },
      {
        name: "Skills",
        href: "/skills",
        icon: Code2,
      },
      {
        name: "Learnings",
        href: "/learnings",
        icon: BookOpen,
      },
    ],
  },
  {
    items: [
      {
        name: "About",
        href: "/about",
        icon: User,
      },
    ],
  },
];
