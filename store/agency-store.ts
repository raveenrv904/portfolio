/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface AgencyFilters {
  search: string;
  technologies: string[];
  projectTypes: string[];
  industries: string[];
  featured: boolean | null;
}

interface AgencyState {
  filters: AgencyFilters;
  isFiltering: boolean;
  setFilter: (key: keyof AgencyFilters | string, value: any) => void;
  clearFilters: () => void;
  setIsFiltering: (filtering: boolean) => void;
}

const initialFilters: AgencyFilters = {
  search: "",
  technologies: [],
  projectTypes: [],
  industries: [],
  featured: null,
};

export const useAgencyStore = create<AgencyState>((set) => ({
  filters: initialFilters,
  isFiltering: false,
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },
  clearFilters: () => set({ filters: initialFilters }),
  setIsFiltering: (filtering) => set({ isFiltering: filtering }),
}));
