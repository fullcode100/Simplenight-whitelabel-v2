import { Traveler } from 'flights/helpers/traveler';
import { create } from 'zustand';

export interface Search {
  direction: 'round_trip' | 'one_way' | 'multicity';
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
  cabynType?: string;
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
