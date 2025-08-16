/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getAgencyProjects } from "@/lib/sanity-fetch";
import AgencyFilterClient from "./agency-filter-client";
import type { FilterSection } from "@/types/filter";

const AgencyContent = async () => {
  const projects = await getAgencyProjects();

  const allTechnologies = Array.from<string>(
    new Set(projects.flatMap((p: any) => p.technologies || []))
  );
  const allIndustries = Array.from<string>(
    new Set(projects.map((p: any) => p.clientIndustry).filter(Boolean))
  );
  const allProjectTypes = Array.from<string>(
    new Set(projects.map((p: any) => p.projectType).filter(Boolean))
  );

  const sections: FilterSection[] = [
    {
      key: "technologies",
      title: "Technologies",
      options: allTechnologies.sort().map((t) => ({ value: t, label: t })),
    },
    {
      key: "industries",
      title: "Industries",
      options: allIndustries.sort().map((i) => ({ value: i, label: i })),
    },
    {
      key: "projectTypes",
      title: "Project Types",
      options: allProjectTypes.sort().map((pt) => ({ value: pt, label: pt })),
    },
    {
      key: "featured",
      title: "Project Showcase",
      options: [
        { value: "true", label: "Featured Work Only" },
        { value: "false", label: "All Projects" },
      ],
    },
  ];

  return (
    <AgencyFilterClient
      totalItems={projects.length}
      filteredCount={projects.length}
      sections={sections}
    />
  );
};

export default AgencyContent;
