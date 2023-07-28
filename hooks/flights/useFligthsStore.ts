import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { create } from 'zustand';

export interface FlightsStore {
  flights: Array<FlightItem>;
  setFlights: (flight: Array<FlightItem>) => void;
  updatePriceFlights: (newPrice: string) => void;
  clear(): void;
}

export const useFlightsStore = create<FlightsStore>()((set) => ({
  flights: [],
  setFlights: (selectedFlights: Array<FlightItem>) => {
    set(() => ({
      flights: selectedFlights,
    }));
  },
  updatePriceFlights: (newPrice: string) => {
    set((state: FlightsStore) => {
      const currentFlights = state.flights;
      const totalFlights = currentFlights.length;
      const newFlights = [...state.flights];
      newFlights[totalFlights - 1].offer.totalFareAmount = newPrice;
      return {
        flights: [...newFlights],
      };
    });
  },
  clear: () => set(() => ({ flights: [] })),
}));
