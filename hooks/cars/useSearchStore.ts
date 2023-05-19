import { Traveler } from 'flights/helpers/traveler';
import { create } from 'zustand';

export interface Search {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  geolocation: string;
  geolocation2: string;
  address: string;
  address2: string;
  driverAge: string;
}

export interface SearchStore {
  search: Search | null;
  setSearch(search: Search): void;
  clear(): void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  search: null,
  setSearch: (cc: Search) => {
    set(() => ({
      search: cc,
    }));
  },
  clear: () => set((state) => ({ ...state, cc: null })),
}));
