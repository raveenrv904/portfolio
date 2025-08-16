/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: { current: string };
  description: string;
  longDescription?: any[];
  featuredImage: any;
  gallery?: any[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "planning" | "development" | "completed" | "archived";
  featured: boolean;
  publishedAt: string;
  order?: number;
}

export interface ProjectFilters {
  search: string;
  technologies: string[];
  status: string[];
  featured: boolean | null;
}

export interface ProjectCardProps {
  project: Project;
  index: number;
}
