/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Filter from "@/components/common/filter";
import { useProjectStore } from "@/store/project-store";
import type { FilterSection } from "@/types/filter";

type Props = {
  totalItems: number;
  filteredCount: number;
  sections: FilterSection[];
};

const ProjectFilterClient: React.FC<Props> = ({
  totalItems,
  filteredCount,
  sections,
}) => {
  const { filters, setFilter, clearFilters } = useProjectStore();

  return (
    <Filter
      searchPlaceholder="Search projects..."
      totalItems={totalItems}
      filteredCount={filteredCount}
      sections={sections}
      filters={filters as any}
      setFilter={setFilter as any}
      clearFilters={clearFilters}
    />
  );
};

export default ProjectFilterClient;
