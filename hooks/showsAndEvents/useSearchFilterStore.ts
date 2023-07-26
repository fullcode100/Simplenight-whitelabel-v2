import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';
import { create } from 'zustand';

export interface IFilters {
  maxDistance: number;
  minDistance: number;
  maxPrice: number;
  minPrice: number;
  maxSeats: number;
  minSeats: number;
}

export interface SearchFilterStore {
  showsAndEvents: SearchItem[];
  filteredShowsAndEvents: SearchItem[];
  filters: IFilters;
  setFilteredShowsAndEvents: (event: SearchItem[]) => void;
  setShowsAndEvents: (event: SearchItem[]) => void;
  setFilters: (filter: IFilters) => void;
}

export const initialFilters = {
  maxDistance: 3000,
  minDistance: 0,
  maxPrice: 5000,
  minPrice: 0,
  maxSeats: 6,
  minSeats: 1,
};

export const useSearchFilterStore = create<SearchFilterStore>()((set) => ({
  filteredShowsAndEvents: [],
  showsAndEvents: [],
  filters: initialFilters,
  setFilteredShowsAndEvents: (filteredShowsAndEvents) => {
    set(() => ({
      filteredShowsAndEvents,
    }));
  },
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
