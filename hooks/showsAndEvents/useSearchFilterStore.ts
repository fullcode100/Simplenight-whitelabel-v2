import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';
import { create } from 'zustand';

export interface IFilters {
  [key: string]: string | undefined;
}

export interface SearchFilterStore {
  showsAndEvents: SearchItem[];
  filters: IFilters;
  setShowsAndEvents: (event: SearchItem[]) => void;
  setFilters: (filter: IFilters) => void;
}

export const useSearchFilterStore = create<SearchFilterStore>()((set) => ({
  showsAndEvents: [],
  filters: {},
  setShowsAndEvents: (showsAndEvents) => {
    set(() => ({
      showsAndEvents,
    }));
  },
  setFilters: (filters) => {
    set(() => ({
      filters,
    }));
  },
}));
