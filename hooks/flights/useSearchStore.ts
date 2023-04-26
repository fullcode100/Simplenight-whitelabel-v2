import { Traveler } from 'flights/helpers/traveler';
import { create } from 'zustand';

export interface Search {
  direction: string;
  startAirport: string;
  endAirport: string;
  startDate: string;
  adults: string;
  children: string;
  infants: string;
  childrenAges: string;
  infantsAges: string;
  geolocation: string;
  address: string;
  geolocation2: string;
  address2: string;
  travelersData: Array<Traveler>;
}

export interface SearchStore {
  search: Search | null;
  setSearch(search: Search): void;
  clear(): void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  search: null,
  setSearch: (cc: Search) => {
    set((state: SearchStore) => ({
      ...state,
      cc,
    }));
  },
  clear: () => set((state) => ({ ...state, cc: null })),
}));
