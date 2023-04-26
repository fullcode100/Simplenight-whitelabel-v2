import { create } from 'zustand';

export interface Passenger {
  name: string;
}

export interface PassengersStore {
  passengers: Array<Passenger>;
  setPassengers(passengers: Array<Passenger>): void;
  clear(): void;
}

export const usePassengers = create<PassengersStore>()((set) => ({
  passengers: [],
  setPassengers: (passengers: Array<Passenger>) => {
    set((state: PassengersStore) => ({
      ...state,
      passengers: passengers,
    }));
  },
  clear: () => set((state) => ({ ...state, passengers: [] })),
}));
