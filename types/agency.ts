/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AgencyProject {
  _id: string;
  _type: "agencyProject";
  title: string;
  slug: { current: string };
  description: string;
  longDescription?: any[];
  featuredImage: any;
  gallery?: any[];
  technologies: string[];
  projectType:
    | "web-app"
    | "mobile-app"
    | "e-commerce"
    | "landing-page"
    | "other";
  clientIndustry: string;
  projectDuration: string;
  teamSize: number;
  myRole: string;
  featured: boolean;
  publishedAt: string;
  order?: number;
}

export interface AgencyFilters {
  search: string;
  technologies: string[];
  projectTypes: string[];
  industries: string[];
  featured: boolean | null;
}
