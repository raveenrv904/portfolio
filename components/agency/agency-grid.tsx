"use client";

import { useAgencyStore } from "@/store/agency-store";
import { AgencyProject } from "@/types/agency";
import React, { useEffect, useMemo, useRef } from "react";
import NotFound from "../common/not-found";
import gsap from "gsap";
import { AgencyCard } from "./agency-card";

interface AgencyProps {
  agencyProjects: AgencyProject[];
}

const AgencyGrid = ({ agencyProjects }: AgencyProps) => {
  const { filters, setIsFiltering } = useAgencyStore();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".agency-project-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [agencyProjects, filters]);

  useEffect(() => {
    setIsFiltering(true);

    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, setIsFiltering]);

  const filteredProjects = useMemo(() => {
    return agencyProjects.filter((project) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.clientIndustry.toLowerCase().includes(searchTerm) ||
          project.myRole.toLowerCase().includes(searchTerm) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm)
          );

        if (!matchesSearch) return false;
      }

      if (filters.featured !== null) {
        if (project.featured !== filters.featured) return false;
      }

      if (filters.projectTypes.length > 0) {
        if (!filters.projectTypes.includes(project.projectType)) return false;
      }
      if (filters.industries.length > 0) {
        if (!filters.industries.includes(project.clientIndustry)) return false;
      }
      if (filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some((tech) =>
          project.technologies.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      return true;
    });
  }, [agencyProjects, filters]);

  if (filteredProjects.length === 0) {
    return <NotFound />;
  }

  return (
    <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project, index) => (
        <div key={project._id} className="project-card">
          <AgencyCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
};

export default AgencyGrid;
