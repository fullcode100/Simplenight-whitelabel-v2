import { CarItem } from 'cars/types/response/CarSearchResponse';
import { create } from 'zustand';

export interface CarsStore {
  car: CarItem | null;
  setCar: (car: CarItem) => void;
  clear(): void;
}

export const useCarsStore = create<CarsStore>()((set) => ({
  car: null,
  setCar: (selectedCar: CarItem) => {
    set(() => ({
      car: selectedCar,
    }));
  },
  clear: () => set(() => ({ car: null })),
}));
