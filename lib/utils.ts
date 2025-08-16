/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getStatusColorForFeaturedProject(status: string) {
  const colors: Record<string, string> = {
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    development:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    planning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };
  return colors[status] || colors.planning;
}

export const getProjectTypeEmoji = (type: string) => {
  const emojis: Record<string, string> = {
    "web-app": "🌐",
    "mobile-app": "📱",
    "e-commerce": "🛒",
    "landing-page": "📄",
    other: "💼",
  };
  return emojis[type] || "💼";
};



export type Project = {
  title: string;
  technologies: string[];
  clientIndustry?: string;
  projectType?: string;
  featured?: boolean | null;
};
export const applyAgencyFilters = (items: Project[], filters: any) => {
  const q = (filters.search || "").toLowerCase().trim();
  const techs: string[] = filters.technologies || [];
  const inds: string[] = filters.industries || [];
  const types: string[] = filters.projectTypes || [];
  const featured = filters.featured;

  return items.filter((p) => {
    if (q) {
      const hay =
        `${p.title} ${p.clientIndustry || ""} ${(p.technologies || []).join(" ")} ${p.projectType || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (techs.length && !techs.every((t) => (p.technologies || []).includes(t))) return false;
    if (inds.length && (!p.clientIndustry || !inds.includes(p.clientIndustry))) return false;
    if (types.length && (!p.projectType || !types.includes(p.projectType))) return false;
    if (featured !== null && p.featured !== featured) return false;
    return true;
  });
};