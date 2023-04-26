import { IPassenger } from 'flights/components/passenger/inputs';
import { create } from 'zustand';
export interface PassengersStore {
  passengers: Array<IPassenger>;
  setPassengers(passengers: Array<IPassenger>): void;
  clear(): void;
}

export const usePassengersStore = create<PassengersStore>()((set) => ({
  passengers: [],
  setPassengers: (passengers: Array<IPassenger>) => {
    set((state: PassengersStore) => ({
      ...state,
      passengers: passengers,
    }));
  },
  clear: () => set((state) => ({ ...state, passengers: [] })),
}));
