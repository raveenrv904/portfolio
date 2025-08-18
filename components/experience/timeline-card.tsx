"use client";
import { cn } from "@/lib/utils";
import { TimelineItem, useTimelineStore } from "@/store/timeline-store";
import { format } from "date-fns";
import gsap from "gsap";
import {
  Award,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
  Clock,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import Badge from "../ui/badge";
import { Button } from "../ui/button";
import { PortableTextRenderer } from "../portable-text/portable-text-renderer";

const TimelineCard = ({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) => {
  const { expandedItems, toggleExpanded } = useTimelineStore();
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isExpanded = expandedItems.has(item._id);
  const isLeft = index % 2 === 0;

  const dateRange = useMemo(() => {
    const start = format(new Date(item.startDate), "MMM yyyy");
    if (item.current) return `${start} - Present`;
    if (item.endDate)
      return `${start} - ${format(new Date(item.endDate), "MMM yyyy")}`;
    return start;
  }, [item]);

  const duration = useMemo(() => {
    const start = new Date(item.startDate);
    const end = item.current
      ? new Date()
      : new Date(item.endDate || item.startDate);
    const months = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""}`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years}y ${remainingMonths}m`;
  }, [item]);

  const handleToggle = useCallback(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;
    const isCurrentlyExpanded = isExpanded;

    if (isCurrentlyExpanded) {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => toggleExpanded(item._id),
      });
    } else {
      toggleExpanded(item._id);
      gsap.set(content, { height: "auto" });
      const height = content.offsetHeight;
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.3, ease: "power2.inOut" }
      );
    }
  }, [isExpanded, item._id, toggleExpanded]);

  useEffect(() => {
    if (!cardRef.current || typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              {
                opacity: 0,
                y: 50,
                x: window.innerWidth >= 768 ? (isLeft ? -50 : 50) : 0,
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "power2.out",
              }
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isLeft]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative flex w-full opacity-0",
        !isLast && "mb-8 md:mb-12",
        "md:items-start",
        isLeft ? "md:justify-start" : "md:justify-end"
      )}
    >
      <div className="hidden md:absolute left-5 top-6 z-20 md:hidden">
        <div
          className={cn(
            "relative w-4 h-4 rounded-full border-3 border-white shadow-lg",
            item.type === "experience" ? "bg-blue-600" : "bg-emerald-600"
          )}
        >
          {item.current && (
            <div className="absolute -inset-1 rounded-full bg-current opacity-30 animate-pulse" />
          )}
        </div>
      </div>

      <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 z-30">
        <div
          className={cn(
            "relative w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 shadow-lg",
            item.type === "experience" ? "bg-blue-600" : "bg-emerald-600"
          )}
        >
          {item.current && (
            <div className="absolute -inset-2 rounded-full bg-current opacity-20 animate-pulse" />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            {item.type === "experience" ? (
              <Briefcase className="h-2.5 w-2.5 text-white" />
            ) : (
              <GraduationCap className="h-2.5 w-2.5 text-white" />
            )}
          </div>
        </div>
      </div>

      <Card
        className={cn(
          "group relative w-full  md:ml-0 md:w-[calc(50%-3rem)] max-w-2xl",
          "border border-gray-200 dark:border-gray-700",
          "bg-white/90 dark:bg-gray-900/90",
          "backdrop-blur-sm hover:backdrop-blur-md",
          "transition-all duration-300 hover:shadow-xl hover:shadow-gray-100/50 dark:hover:shadow-gray-900/30",
          "hover:border-gray-300 dark:hover:border-gray-600",
          isLeft ? "md:mr-auto" : "md:ml-auto"
        )}
      >
        <CardContent className="p-5 md:p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              {item.logo ? (
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <Image
                    src={urlFor(item.logo).width(48).height(48).url()}
                    alt={`${item.subtitle} logo`}
                    fill
                    className="object-contain p-1"
                    sizes="(max-width: 768px) 40px, 48px"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-sm",
                    item.type === "experience"
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "bg-emerald-50 dark:bg-emerald-900/20"
                  )}
                >
                  {item.type === "experience" ? (
                    <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
                {item.current && (
                  <Badge
                    variant="secondary"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 text-xs font-medium py-0.5"
                  >
                    Current
                  </Badge>
                )}
              </div>

              <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                {item.subtitle}
              </p>

              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>{dateRange}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>{duration}</span>
                </div>

                {item.location && (
                  <div className="col-span-2 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "hidden md:flex text-xs font-medium px-2.5 py-1",
                item.type === "experience"
                  ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700"
              )}
            >
              {item.type === "experience" ? "Work" : "Education"}
            </Badge>
          </div>
          {item.technologies && item.technologies.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {item.technologies
                  .slice(0, isExpanded ? undefined : 6)
                  .map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                {!isExpanded && item.technologies.length > 6 && (
                  <Badge
                    variant="outline"
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    +{item.technologies.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div
            ref={contentRef}
            className={cn(
              "overflow-hidden transition-all duration-300",
              !isExpanded && "h-0 opacity-0"
            )}
          >
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              {item.description && (
                <div className="mb-4">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Overview
                  </h4>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                    <PortableTextRenderer content={item.description} />
                  </div>
                </div>
              )}

              {item.achievements && item.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {item.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="text-xs md:text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {(item.description ||
            (item.achievements && item.achievements.length > 0) ||
            (item.technologies && item.technologies.length > 6)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              className="w-full mt-4 h-8 text-xs md:text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">
                {isExpanded ? (
                  <ChevronUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
                )}
              </span>
              {isExpanded ? "Show Less" : "Show More Details"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineCard;
