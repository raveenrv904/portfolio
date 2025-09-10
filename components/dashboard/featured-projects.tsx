/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import BaseWidget from "./base-widget";
import { Button } from "../ui/button";
import Link from "next/link";
import { Calendar, ExternalLink, Github } from "lucide-react";
import { getFeaturedProjects } from "@/lib/sanity-fetch";
import gsap from "gsap";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { getStatusColorForFeaturedProject } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface FeaturedProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  featuredImage: any;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: string;
  publishedAt: string;
}

const FeaturedProjects = () => {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const emptyStateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const featuredProjects = await getFeaturedProjects();
        setProjects(
          featuredProjects.length > 2
            ? featuredProjects.slice(0, 2)
            : featuredProjects || []
        );
      } catch {
        setError("Failed to load featured projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  useEffect(() => {
    if (loading || !containerRef.current) return;

    if (projects.length > 0) {
      const validRefs = projectRefs.current.filter((ref) => ref !== null);

      if (validRefs.length > 0) {
        gsap.fromTo(
          validRefs,
          {
            opacity: 0,
            y: 25,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.1,
          }
        );

        validRefs.forEach((ref, index) => {
          const statusBadge = ref?.querySelector(".status-badge");
          if (statusBadge) {
            gsap.fromTo(
              statusBadge,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: 0.3 + index * 0.15,
                ease: "back.out(1.2)",
              }
            );
          }
        });
      }
    } else {
      if (emptyStateRef.current) {
        gsap.fromTo(
          emptyStateRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    }
  }, [projects, loading]);

  const handleMouseEnter = (index: number) => {
    const card = projectRefs.current[index];
    if (!card) return;

    const tl = gsap.timeline();

    tl.to(card, {
      scale: 1.02,
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });

    const image = card.querySelector("img");
    if (image) {
      tl.to(
        image,
        {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );
    }

    const buttons = card.querySelectorAll(".action-button");
    if (buttons.length > 0) {
      tl.fromTo(
        buttons,
        { opacity: 0.7, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
        },
        0.1
      );
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = projectRefs.current[index];
    if (!card) return;

    const tl = gsap.timeline();

    tl.to(card, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });

    // Reset image scale
    const image = card.querySelector("img");
    if (image) {
      tl.to(
        image,
        {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );
    }

    const buttons = card.querySelectorAll(".action-button");
    if (buttons.length > 0) {
      tl.to(
        buttons,
        {
          opacity: 0.7,
          scale: 0.9,
          duration: 0.2,
          ease: "power2.out",
        },
        0
      );
    }
  };

  return (
    <BaseWidget
      title="Featured Projects"
      description="Showcase of your best work"
      loading={loading}
      error={error}
      className="col-span-2"
      action={
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Link className="flex item-center" href="/projects">
            <span>View All</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="" ref={containerRef}>
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={project._id}
                ref={(el: any) => (projectRefs.current[index] = el)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer will-change-transform opacity-0"
              >
                <div className="flex item-start space-x-4">
                  {project.featuredImage && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 will-change-transform">
                      <Image
                        src={urlFor(project.featuredImage)
                          .width(64)
                          .height(64)
                          .url()}
                        alt={project.title}
                        fill
                        className="object-cover will-change-transform"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex item-start justify-between">
                      <Link
                        href={`/projects/${project.slug.current}`}
                        className="cursor-pointer"
                      >
                        <h4 className="font-semibold text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                      </Link>
                      <span
                        className={`status-badge inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColorForFeaturedProject(project.status)} ml-2 flex-shrink-0 will-change-transform`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {project.githubUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="action-button cursor-pointer h-6 w-6 p-0 opacity-70 will-change-transform"
                          >
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-3 w-3" />
                            </Link>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="action-button cursor-pointer h-6 w-6 p-0 opacity-70 will-change-transform"
                          >
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(project.publishedAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={emptyStateRef} className="text-center py-8 opacity-0">
            <ExternalLink className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              No featured projects found. Add some in your CMS!
            </p>
          </div>
        )}
      </div>
    </BaseWidget>
  );
};

export default FeaturedProjects;
