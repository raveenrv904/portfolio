/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { ProjectFilters } from "@/types/project";

interface ProjectState {
  filters: ProjectFilters;
  isFiltering: boolean;
  setFilter: (key: keyof ProjectFilters, value: any) => void;
  clearFilters: () => void;
  setIsFiltering: (filtering: boolean) => void;
}

const initialFilters: ProjectFilters = {
  search: "",
  technologies: [],
  status: [],
  featured: null,
};

export const useProjectStore = create<ProjectState>((set) => ({
  filters: initialFilters,
  isFiltering: false,

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },

  clearFilters: () => {
    set({ filters: initialFilters });
  },

  setIsFiltering: (filtering) => {
    set({ isFiltering: filtering });
  },
}));
