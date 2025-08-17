/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjects } from "@/lib/sanity-fetch";
import React from "react";
import ProjectFilterClient from "./project-filter-client";
import type { FilterSection } from "@/types/filter";
import ProjectGrid from "./projects-grid";
import { Archive, CheckCircle, Circle, Clock } from "lucide-react";

const ProjectContent = async () => {
  const projects = await getProjects();

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p: any) => p.technologies))
  ).sort();

  const sections: FilterSection[] = [
    {
      key: "technologies",
      title: "Technologies",
      options: allTechnologies.map((t) => ({
        value: String(t),
        label: String(t),
      })),
    },
    {
      key: "status",
      title: "Project Status",
      options: [
        {
          value: "completed",
          label: "Completed",
          icon: <CheckCircle className="w-3 h-3" />,
          color: "text-emerald-600",
        },
        {
          value: "development",
          label: "In Development",
          icon: <Clock className="w-3 h-3" />,
          color: "text-blue-600",
        },
        {
          value: "planning",
          label: "Planning",
          icon: <Circle className="w-3 h-3" />,
          color: "text-amber-600",
        },
        {
          value: "archived",
          label: "Archived",
          icon: <Archive className="w-3 h-3" />,
          color: "text-gray-600",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <ProjectFilterClient
        totalItems={projects.length}
        filteredCount={projects.length}
        sections={sections}
      />
      <ProjectGrid projects={projects} />
    </div>
  );
};

export default ProjectContent;
