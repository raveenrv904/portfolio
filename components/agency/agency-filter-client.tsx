/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Filter from "@/components/common/filter";
import { useAgencyStore } from "@/store/agency-store";
import type { FilterSection } from "@/types/filter";

type Props = {
  totalItems: number;
  filteredCount: number;
  sections: FilterSection[];
};

const AgencyFilterClient: React.FC<Props> = ({
  totalItems,
  filteredCount,
  sections,
}) => {
  const { filters, setFilter, clearFilters } = useAgencyStore();

  return (
    <Filter
      searchPlaceholder="Search agency projects..."
      totalItems={totalItems}
      filteredCount={filteredCount}
      sections={sections}
      filters={filters as any}
      setFilter={setFilter as any}
      clearFilters={clearFilters}
    />
  );
};

export default AgencyFilterClient;
