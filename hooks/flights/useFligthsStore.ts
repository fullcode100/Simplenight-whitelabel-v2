import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { create } from 'zustand';

export interface FlightsStore {
  flights: Array<FlightItem>;
  setFlights: (flight: Array<FlightItem>) => void;
  clear(): void;
}

export const useFlightsStore = create<FlightsStore>()((set) => ({
  flights: [],
  setFlights: (flights: Array<FlightItem>) => {
    set(() => ({
      flights,
    }));
  },
  clear: () => set((state) => ({ ...state, flights: [] })),
}));
