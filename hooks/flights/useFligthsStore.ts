import { NewOffer } from 'flights/types/request/FlightDetailRequest';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import { create } from 'zustand';

export interface FlightsStore {
  flights: Array<FlightItem>;
  setFlights: (flight: Array<FlightItem>) => void;
  updatePriceFlights: (newPrice: NewOffer) => void;
  clear(): void;
}

export const useFlightsStore = create<FlightsStore>()((set) => ({
  flights: [],
  setFlights: (selectedFlights: Array<FlightItem>) => {
    set(() => ({
      flights: selectedFlights,
    }));
  },
  updatePriceFlights: (newOffer: NewOffer) => {
    set((state: FlightsStore) => {
      const currentFlights = state.flights;
      const totalFlights = currentFlights.length;
      const newFlights = [...state.flights];
      const currentOffer = newFlights[totalFlights - 1].offer;
      newFlights[totalFlights - 1].offer = { ...currentOffer, ...newOffer };
      return {
        flights: [...newFlights],
      };
    });
  },
  clear: () => set(() => ({ flights: [] })),
}));
