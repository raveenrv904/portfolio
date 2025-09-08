/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Briefcase } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  _id: string;
  name: string;
  category: string;
  description?: string;
  featured?: boolean;
  icon?: any;
  relatedProjects?: { _id: string; title: string; slug: { current: string } }[];
  relatedExperience?: { _id: string; role: string; company: string }[];
}

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({
  skill,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 20, scale: 0.95 },
      {
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.05,
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
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="relative flex-shrink-0">
              {skill.icon ? (
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 p-1.5 sm:p-2">
                  <Image
                    src={urlFor(skill.icon).width(60).height(60).url()}
                    alt={skill.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-sm sm:text-base">
                    {skill.name.charAt(0)}
                  </span>
                </div>
              )}

              {skill.featured && (
                <Badge className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs px-1.5 py-0.5">
                  ★
                </Badge>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                {skill.name}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 capitalize">
                {skill.category}
              </span>
            </div>
          </div>

          {skill.description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
              {skill.description}
            </p>
          )}

          <div className="space-y-3">
            {skill.relatedProjects && skill.relatedProjects.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  <ExternalLink className="h-3 w-3" />
                  <span>Projects ({skill.relatedProjects.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.relatedProjects.slice(0, 3).map((project) => (
                    <Link
                      key={project._id}
                      href={`/projects/${project.slug.current}`}
                      className="inline-block"
                    >
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors cursor-pointer">
                        {project.title}
                      </span>
                    </Link>
                  ))}
                  {skill.relatedProjects.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                      +{skill.relatedProjects.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {skill.relatedExperience && skill.relatedExperience.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  <Briefcase className="h-3 w-3" />
                  <span>Experience ({skill.relatedExperience.length})</span>
                </div>
                <div className="space-y-1">
                  {skill.relatedExperience.slice(0, 2).map((exp) => (
                    <div
                      key={exp._id}
                      className="text-xs text-neutral-600 dark:text-neutral-400"
                    >
                      <span className="font-medium">{exp.role}</span>
                      <span className="text-neutral-500 dark:text-neutral-500">
                        {" "}
                        at {exp.company}
                      </span>
                    </div>
                  ))}
                  {skill.relatedExperience.length > 2 && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-500">
                      +{skill.relatedExperience.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(SkillCard);
