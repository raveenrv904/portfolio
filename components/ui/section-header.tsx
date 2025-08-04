"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
  delay?: number;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  delay = 0,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline({ delay });

    tl.fromTo(
      headerRef.current.querySelector("h2"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    ).fromTo(
      headerRef.current.querySelector("p"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );
  }, [delay]);

  return (
    <div ref={headerRef} className={cn("text-center space-y-6", className)}>
      <h2 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
