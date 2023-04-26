import { create } from 'zustand';

export interface Flight {
  name: string;
}

export interface FlightsStore {
  flights: Array<Flight>;
  addFlight: (flight: Flight) => void;
  clear(): void;
}

export const useFlights = create<FlightsStore>()((set) => ({
  flights: [],
  addFlight: (flight: Flight) => {
    set((state: FlightsStore) => ({
      ...state,
      flights: [...state.flights, flight],
    }));
  },
  clear: () => set((state) => ({ ...state, flights: [] })),
}));
