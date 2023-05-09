import { FilterCriteria } from 'hotels/hooks/useFilterHotels';
import { create } from 'zustand';

export const defaultCriteriaState: FilterCriteria = {
  freeCancelation: false,
  hotelName: '',
  MaxPrice: '5000',
  MinPrice: '0',
  MaxRange: '5',
  MinRange: '1',
  property: 'propertyAll',
  sortCriteria: 'priceLowFirst',
};

export interface SearchFilterStore {
  criteria: FilterCriteria;
  setCriteria(criteria: FilterCriteria): void;
  clear(): void;
}

export const useSearchFilterStore = create<SearchFilterStore>()((set) => ({
  criteria: defaultCriteriaState,
  setCriteria: (criteria) => {
    set(() => ({
      criteria,
    }));
  },
  clear: () => set((state) => ({ ...state, criteria: defaultCriteriaState })),
}));
