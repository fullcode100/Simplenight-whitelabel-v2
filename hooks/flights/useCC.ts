import { create } from 'zustand';

export interface CCard {
  name: string;
}

export interface CCStore {
  cc: CCard | null;
  setCC(cc: CCard): void;
  clear(): void;
}

export const useCC = create<CCStore>()((set) => ({
  cc: null,
  setCC: (cc: CCard) => {
    set((state: CCStore) => ({
      ...state,
      cc,
    }));
  },
  clear: () => set((state) => ({ ...state, cc: null })),
}));
