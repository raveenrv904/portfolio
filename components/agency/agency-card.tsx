"use client";

import { forwardRef } from "react";
import {
  Calendar,
  Users,
  Clock,
  Building2,
  ExternalLink,
  Award,
} from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

type ProjectType =
  | "web-app"
  | "mobile-app"
  | "e-commerce"
  | "landing-page"
  | "other";

interface AgencyProject {
  title?: string;
  description?: string;
  clientIndustry?: string;
  myRole?: string;
  projectType?: ProjectType;
  projectDuration?: string;
  teamSize?: string | number;
  technologies?: string[];
  publishedAt?: string | Date;
  featured?: boolean;
  featuredImage?: string;
  slug?:
    | {
        current?: string;
      }
    | string;
}

interface AgencyProjectCardProps {
  project: AgencyProject;
  index?: number;
  onProjectClick?: (slug: string) => void;
  onCaseStudyClick?: (slug: string) => void;
}

const projectTypeIcons: Record<ProjectType, string> = {
  "web-app": "🌐",
  "mobile-app": "📱",
  "e-commerce": "🛒",
  "landing-page": "📄",
  other: "💼",
};

const projectTypeColors: Record<ProjectType, string> = {
  "web-app":
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  "mobile-app":
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  "e-commerce":
    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  "landing-page":
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  other:
    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800",
};

const formatDistanceToNow = (date: Date): string => {
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(" ");

export const AgencyCard = forwardRef<HTMLDivElement, AgencyProjectCardProps>(
  ({ project, index = 0, onProjectClick, onCaseStudyClick }, ref) => {
    const getProjectSlug = (): string => {
      if (typeof project.slug === "string") return project.slug;
      if (typeof project.slug === "object" && project.slug?.current)
        return project.slug.current;
      return "";
    };

    const handleCardClick = (): void => {
      const slug = getProjectSlug();
      if (slug) {
        onProjectClick?.(slug);
      }
    };

    const handleCaseStudyClick = (
      e: React.MouseEvent<HTMLButtonElement>
    ): void => {
      e.stopPropagation();
      const slug = getProjectSlug();
      if (slug) {
        onCaseStudyClick?.(slug);
      }
    };

    if (!project) {
      return (
        <div
          ref={ref}
          className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
        >
          <p className="text-gray-500">Project data not available</p>
        </div>
      );
    }

    const projectType: ProjectType =
      (project.projectType as ProjectType) || "other";
    const technologies: string[] = project.technologies || [];
    const publishedAt: Date = project.publishedAt
      ? new Date(project.publishedAt)
      : new Date();

    return (
      <>
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>

        <div
          ref={ref}
          className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] w-full max-w-sm mx-auto sm:max-w-none"
          style={{
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
          }}
          onClick={handleCardClick}
        >
          <div className="h-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-gray-800 relative">
            {project.featured && (
              <div className="absolute top-3 left-3 z-10">
                <div className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-medium rounded-full flex items-center space-x-1">
                  <Award className="h-3 w-3" />
                  <span className="hidden sm:inline">Featured Work</span>
                  <span className="sm:hidden">Featured</span>
                </div>
              </div>
            )}

            <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              {project.featuredImage ? (
                <Image
                  src={urlFor(project.featuredImage).url()}
                  alt={project.title || "Project image"}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-400 dark:text-neutral-600">
                  <Building2 className="h-8 w-8 sm:h-12 sm:w-12" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-3 right-3">
                <div
                  className={cn(
                    "inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium backdrop-blur-sm",
                    projectTypeColors[projectType]
                  )}
                >
                  <span className="text-sm">
                    {projectTypeIcons[projectType]}
                  </span>
                  <span className="capitalize hidden sm:inline">
                    {projectType.replace("-", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-3">
                <h3 className="text-lg sm:text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                  {project.title || "Untitled Project"}
                </h3>
                <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <Building2 className="h-3 w-3 flex-shrink-0" />
                    <span className="capitalize truncate">
                      {project.clientIndustry || "Various"}
                    </span>
                  </div>
                  {project.myRole && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="truncate">{project.myRole}</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
                {project.description || "Project description not available."}
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
                <div className="text-center min-w-0">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="h-3 w-3 text-neutral-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Duration
                  </p>
                  <p className="text-xs font-medium truncate">
                    {project.projectDuration || "N/A"}
                  </p>
                </div>
                <div className="text-center border-x border-neutral-200 dark:border-neutral-700 min-w-0">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-3 w-3 text-neutral-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Team Size
                  </p>
                  <p className="text-xs font-medium truncate">
                    {project.teamSize?.toString() || "N/A"}
                  </p>
                </div>
                <div className="text-center min-w-0">
                  <div className="flex items-center justify-center mb-1">
                    <Building2 className="h-3 w-3 text-neutral-500 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    Type
                  </p>
                  <p className="text-xs font-medium capitalize truncate">
                    {projectType.replace("-", " ")}
                  </p>
                </div>
              </div>

              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {technologies
                    .slice(0, 3)
                    .map((tech: string, techIndex: number) => (
                      <span
                        key={`${tech}-${techIndex}`}
                        className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 truncate max-w-20 sm:max-w-none"
                        title={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  {technologies.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                      +{technologies.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-2">
                <div className="flex items-center space-x-1 min-w-0 flex-1">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">
                    {formatDistanceToNow(publishedAt)}
                  </span>
                </div>

                <button
                  onClick={handleCaseStudyClick}
                  className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-sm px-1"
                  type="button"
                >
                  <span className="hidden sm:inline">Case Study</span>
                  <span className="sm:hidden">View</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

AgencyCard.displayName = "AgencyCard";

export default AgencyCard;
