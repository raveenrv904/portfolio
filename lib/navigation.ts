import {
  LayoutDashboard,
  FolderOpen,
  Building2,
  Briefcase,
  Code2,
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
        name: "Personal Projects",
        href: "/projects",
        icon: FolderOpen,
      },
      {
        name: "My Contributions",
        href: "/contributions",
        icon: Building2,
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
