"use client";
import { cn } from "@/lib/utils";
import { TimelineItem } from "@/store/timeline-store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";
import TimelineCard from "./timeline-card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const Timeline = ({ items, className }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }, [items]);

  useEffect(() => {
    if (
      !timelineRef.current ||
      !lineRef.current ||
      typeof window === "undefined" ||
      window.innerWidth < 768
    )
      return;

    const line = lineRef.current;

    gsap.set(line, {
      scaleY: 0,
      transformOrigin: "top center",
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(line, {
          scaleY: self.progress,
          duration: 0.1,
          ease: "none",
        });
      },
    });

    return () => scrollTrigger.kill();
  }, [sortedItems.length]);

  useEffect(() => {
    if (!headerRef.current || typeof window === "undefined") return;

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (!sortedItems.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500 dark:text-gray-400">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6 shadow-sm">
          <Calendar className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Timeline Items</h3>
        <p className="text-sm text-center max-w-md">
          Timeline items will appear here as they are added to showcase the
          professional journey.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full max-w-6xl mx-auto px-4 sm:px-6",
        className
      )}
    >
      <div ref={timelineRef} className="relative">
        <div
          ref={lineRef}
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 shadow-sm"
          style={{
            height: "calc(100% - 2rem)",
            top: "1rem",
          }}
        />

        <div className="relative space-y-0">
          {sortedItems.map((item, index) => (
            <TimelineCard
              key={item._id}
              item={item}
              index={index}
              isLast={index === sortedItems.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
