/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProjectCardProps } from "@/types/project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Archive,
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  ExternalLink,
  Github,
} from "lucide-react";
import React, { forwardRef, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { Button } from "../ui/button";
import { cn, getStatusColorForFeaturedProject } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

gsap.registerPlugin(ScrollTrigger);

const statusIcons = {
  planning: <Circle className="h-4 w-4" />,
  development: <Clock className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
  archived: <Archive className="h-4 w-4" />,
};

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index }, ref) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const el = cardRef.current;
      const onEnter = () =>
        gsap.to(el, { y: -8, duration: 0.2, ease: "power1.out" });
      const onLeave = () =>
        gsap.to(el, { y: 0, duration: 0.2, ease: "power1.inOut" });

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    }, [index]);

    return (
      <div ref={cardRef} className="group cursor-pointer">
        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-neutral-900">
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                Featured
              </div>
            </div>
          )}

          <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Link
              href={`/projects/${project.slug.current}`}
              className="cursor-pointer"
            >
              {project.featuredImage ? (
                <Image
                  src={urlFor(project.featuredImage)
                    .width(600)
                    .height(400)
                    .url()}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-400 dark:text-neutral-600">
                  <Circle className="h-12 w-12" />
                </div>
              )}
            </Link>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

            <div className="absolute top-4 right-4 flex space-x-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              {project.githubUrl && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <Link
                href={`/projects/${project.slug.current}`}
                className="cursor-pointer"
              >
                <h3 className="text-xl font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
              </Link>

              <div
                className={cn(
                  "inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium",
                  getStatusColorForFeaturedProject(project.status)
                )}
              >
                {statusIcons[project.status]}
                <span className="capitalize">{project.status}</span>
              </div>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(project.publishedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <Link
                href={`/projects/${project.slug.current}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium cursor-pointer"
              >
                View Details →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";
