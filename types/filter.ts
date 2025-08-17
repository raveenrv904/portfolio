/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface FilterSection {
  key: string;
  title: string;
  multi?: boolean;
  options: FilterOption[];
}

export interface FilterProps {
  searchPlaceholder?: string;
  totalItems: number;
  filteredCount: number;
  sections: FilterSection[];
  filters: Record<string, string[] | string | boolean | null>;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
}
