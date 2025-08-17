"use client";
import { useProjectStore } from "@/store/project-store";
import { Project } from "@/types/project";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import NotFound from "../common/not-found";
import { ProjectCard } from "./project-card";

interface ProjectsProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectsProps) => {
  const searchParams = useSearchParams();
  const skillFilter = searchParams.get("skill");
  const { filters, setIsFiltering, setFilter } = useProjectStore();
  const gridRef = useRef<HTMLDivElement>(null);

  // Animate cards on projects change
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [projects, filters]);

  useEffect(() => {
    if (skillFilter && !filters.technologies.includes(skillFilter)) {
      setFilter("technologies", [...filters.technologies, skillFilter]);
    }
  }, [skillFilter, filters.technologies, setFilter]);

  const filteredProjects = useMemo(() => {
    setIsFiltering(true);
    const filtered = projects.filter((project) => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch =
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm)
          );
        if (!matchesSearch) return false;
      }

      if (filters.featured !== null) {
        if (project.featured !== filters.featured) return false;
      }

      if (filters.status.length > 0) {
        if (!filters.status.includes(project.status)) return false;
      }

      if (filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some((tech) =>
          project.technologies.some((projectTech) =>
            projectTech.toLowerCase().includes(tech.toLowerCase())
          )
        );
        if (!hasMatchingTech) return false;
      }

      return true;
    });

    setTimeout(() => setIsFiltering(false), 300);
    return filtered;
  }, [projects, filters, setIsFiltering]);

  if (filteredProjects.length === 0) {
    return <NotFound />;
  }

  return (
    <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredProjects.map((project, index) => (
        <div key={project._id} className="project-card">
          <ProjectCard project={project} index={index} />
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
