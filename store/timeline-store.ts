/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface TimelineItem {
  _id: string;
  type: "experience" | "education";
  title: string;
  subtitle: string;
  description: any[];
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  logo?: any;
  achievements?: string[];
  technologies?: string[];
  order?: number;
}

interface TimelineState {
  selectedItem: TimelineItem | null;
  setSelectedItem: (item: TimelineItem | null) => void;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  expandedItems: new Set(),
  toggleExpanded: (id) => {
    const { expandedItems } = get();
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }

    set({ expandedItems: newExpanded });
  },
}));
