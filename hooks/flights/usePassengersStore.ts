import { IPassenger } from 'flights/components/passenger/inputs';
import { create } from 'zustand';
export interface PassengersStore {
  passengers: Array<IPassenger>;
  passengersQuantity: number;
  setPassengersQuantity(quatity: number): void;
  setPassengers(passengers: Array<IPassenger>): void;
  clear(): void;
}

export const usePassengersStore = create<PassengersStore>()((set) => ({
  passengers: [],
  passengersQuantity: 0,
  setPassengersQuantity: (quatity: number) => {
    set((state: PassengersStore) => ({
      ...state,
      passengersQuantity: quatity,
    }));
  },
  setPassengers: (passengers: Array<IPassenger>) => {
    set((state: PassengersStore) => ({
      ...state,
      passengers: passengers,
    }));
  },
  clear: () =>
    set((state) => ({ ...state, passengers: [], passengersQuantity: 0 })),
}));
