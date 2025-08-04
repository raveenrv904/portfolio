"use client";
import { getFeaturedAgencyProjects } from "@/lib/sanity-fetch";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from "react";
import BaseWidget from "./base-widget";
import { Button } from "../ui/button";
import Link from "next/link";
import gsap from "gsap";
import { Award, Building2, ExternalLink, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getProjectTypeEmoji } from "@/lib/utils";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface FeaturedAgencyProjectProps {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  featuredImage: any;
  technologies: string[];
  projectType: string;
  clientIndustry: string;
  myRole: string;
  publishedAt: string;
}

const FeaturedAgencyProjects = () => {
  const [projects, setProjects] = useState<FeaturedAgencyProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const emptyStateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const featuredProjects = await getFeaturedAgencyProjects();
        setProjects(featuredProjects || []);
      } catch {
        setError("Failed to load agency projects");
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
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2,
          }
        );
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

    gsap.to(card, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });

    const image = card.querySelector("img");
    if (image) {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = projectRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });

    const image = card.querySelector("img");
    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <BaseWidget
      title="Featured Agency Work"
      description="Professional client projects and solutions"
      loading={loading}
      error={error}
      className="col-span-2"
      action={
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Link className="flex item-center" href="/agency">
            <Award className="mr-2 h-4 w-4" />
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
                <div className="flex items-start space-x-4">
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
                    <div className="flex items-start justify-between">
                      <Link
                        href={`/agency/${project.slug.current}`}
                        className="cursor-pointer"
                      >
                        <h4 className="font-semibold text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                          {project.title}
                        </h4>
                      </Link>
                      <span className="text-lg ml-2 flex-shrink-0">
                        {getProjectTypeEmoji(project.projectType)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      <Building2 className="h-3 w-3" />
                      <span className="capitalize">
                        {project.clientIndustry}
                      </span>
                      <span>•</span>
                      <span>{project.myRole}</span>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-1">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <Users className="h-3 w-3 mr-1" />
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
            <Building2 className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">
              No agency projects found. Add some in your CMS!
            </p>
          </div>
        )}
      </div>
    </BaseWidget>
  );
};

export default FeaturedAgencyProjects;
