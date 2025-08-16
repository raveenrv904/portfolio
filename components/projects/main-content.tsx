/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProjects } from "@/lib/sanity-fetch";
import React from "react";
import ProjectFilterClient from "./project-filter-client";
import type { FilterSection } from "@/types/filter";

const ProjectContent = async () => {
  const projects = await getProjects();

  const allTechnologies = Array.from<string>(
    new Set(projects.flatMap((p: any) => p.technologies))
  );

  const sections: FilterSection[] = [
    {
      key: "technologies",
      title: "Technologies",
      options: allTechnologies.map((t) => ({ value: t, label: t })),
    },
    {
      key: "status",
      title: "Status",
      options: [
        { value: "completed", label: "Completed" },
        { value: "development", label: "In Development" },
        { value: "planning", label: "Planning" },
        { value: "archived", label: "Archived" },
      ],
    },
    {
      key: "featured",
      title: "Project Type",
      // single-select example; Filter handles toggling non-array fields
      options: [
        { value: "true", label: "Featured Only" },
        { value: "false", label: "All Projects" },
      ],
    },
  ];

  return (
    <ProjectFilterClient
      totalItems={projects.length}
      filteredCount={projects.length}
      sections={sections}
    />
  );
};

export default ProjectContent;
