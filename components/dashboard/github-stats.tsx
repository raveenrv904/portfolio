"use client";

import React, { useEffect, useRef } from "react";
import BaseWidget from "./base-widget";
import { useGithubStats } from "@/hooks/use-github-data";
import { ExternalLink, Globe, Lock, Star, Users } from "lucide-react";
import gsap from "gsap";
import { Button } from "../ui/button";
import Link from "next/link";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  delay: number;
}

function StatItem({ icon, label, value, color, delay }: StatItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current || !valueRef.current || !iconRef.current) return;

    const tl = gsap.timeline();

    gsap.set(itemRef.current, {
      opacity: 0,
      y: 15,
      scale: 0.95,
    });

    tl.to(itemRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      delay,
      ease: "power2.out",
    }).to(
      valueRef.current,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      "-=0.2"
    );

    const handleMouseEnter = () => {
      gsap.to(itemRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(iconRef.current, {
        rotation: 5,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(itemRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const element = itemRef.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tl.kill();
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [delay, value]);

  return (
    <div
      ref={itemRef}
      className="relative rounded-xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer will-change-transform"
    >
      <div className="flex items-center space-x-3">
        <div
          ref={iconRef}
          className={`p-3 rounded-xl ${color} shadow-lg flex-shrink-0 will-change-transform`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p
            ref={valueRef}
            className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 opacity-0"
          >
            {value.toLocaleString()}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

const GithubStats = () => {
  const { stats, loading, error } = useGithubStats();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !stats) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [stats]);

  return (
    <BaseWidget
      title="GitHub Statistics"
      description="raveenrv904"
      loading={loading}
      error={error}
      action={
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Link
            className="flex item-center"
            href="https://github.com/raveenrv904"
            target="_blank"
          >
            <span>Github</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      {stats && (
        <div
          className="grid gap-4 grid-cols-2 lg:grid-cols-4 opacity-0"
          ref={containerRef}
        >
          <StatItem
            icon={<Globe className="h-5 w-5 text-white" />}
            label="Public Repos"
            value={stats.public_repos}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            delay={0}
          />

          <StatItem
            icon={<Lock className="h-5 w-5 text-white" />}
            label="Private Repos"
            value={stats.private_repos}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            delay={0.1}
          />
          <StatItem
            icon={<Star className="h-5 w-5 text-white" />}
            label="Total Stars"
            value={stats.total_stars}
            color="bg-gradient-to-br from-yellow-500 to-orange-500"
            delay={0.2}
          />
          <StatItem
            icon={<Users className="h-5 w-5 text-white" />}
            label="Followers"
            value={stats.followers}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            delay={0.3}
          />
        </div>
      )}
    </BaseWidget>
  );
};

export default GithubStats;
