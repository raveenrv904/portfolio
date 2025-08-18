"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  OptimizedFeaturedAgencyProject,
  OptimizedFeaturedProject,
  OptimizedGitCalender,
  OptimizedGithubStats,
  OptimizedLanguagesChart,
} from "./optimized-widget";

const DashboardContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.querySelectorAll(".dashboard-item"),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: {
          amount: 0.5,
          each: 0.1,
        },
        delay: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="hidden md:grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="dashboard-item">
            <OptimizedGithubStats />
          </div>
          <div className="dashboard-item">
            <OptimizedGitCalender />
          </div>
        </div>

        <div className="dashboard-item">
          <OptimizedLanguagesChart />
        </div>
      </div>

      <div className="md:hidden space-y-4">
        <div className="dashboard-item">
          <OptimizedGithubStats />
        </div>

        <div className="dashboard-item">
          <OptimizedLanguagesChart />
        </div>
        <div className="dashboard-item">
          <OptimizedGitCalender />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="dashboard-item">
          <OptimizedFeaturedProject />
        </div>
        <div className="dashboard-item">
          <OptimizedFeaturedAgencyProject />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
