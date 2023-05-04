import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { create } from 'zustand';

export interface FlightsStore {
  flights: Array<FlightItem>;
  addFlight: (flight: FlightItem) => void;
  clear(): void;
}

export const useFlightsStore = create<FlightsStore>()((set) => ({
  flights: [],
  addFlight: (flight: FlightItem) => {
    set((state: FlightsStore) => ({
      ...state,
      flights: [...state.flights, flight],
    }));
  },
  clear: () => set((state) => ({ ...state, flights: [] })),
}));
