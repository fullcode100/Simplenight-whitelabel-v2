import { IPassenger } from 'flights/components/passenger/inputs';
import { create } from 'zustand';

interface PassengersQuantity {
  adults: number;
  children: number;
  infants: number;
}
export interface PassengersStore {
  passengers: Array<IPassenger>;
  passengersQuantity: PassengersQuantity & {
    childrenAges: number[];
    total: number;
  };
  setPassengersQuantity(
    value: PassengersQuantity,
    childrenAges: number[],
  ): void;
  setPassengers(passengers: Array<IPassenger>): void;
  clear(): void;
}

export const usePassengersStore = create<PassengersStore>()((set) => ({
  passengers: [],
  passengersQuantity: {
    adults: 0,
    children: 0,
    childrenAges: [],
    infants: 0,
    total: 0,
  },
  setPassengersQuantity: (values: PassengersQuantity, childrenAges) => {
    const total = Object.values(values).reduce((a, b) => a + b, 0);
    set((state: PassengersStore) => ({
      ...state,
      passengersQuantity: { ...values, childrenAges, total },
    }));
  },
  setPassengers: (passengers: Array<IPassenger>) => {
    set((state: PassengersStore) => ({
      ...state,
      passengers: passengers,
    }));
  },
  clear: () =>
    set((state) => ({
      ...state,
      passengers: [],
      passengersQuantity: {
        adults: 0,
        children: 0,
        childrenAges: [],
        infants: 0,
        total: 0,
      },
    })),
}));
