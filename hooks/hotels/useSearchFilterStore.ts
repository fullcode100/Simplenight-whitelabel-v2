import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import { FilterCriteria } from 'hotels/hooks/useFilterHotels';
import { create } from 'zustand';

export const defaultCriteriaState: FilterCriteria = {
  keywordSearch: '',
  MaxPrice: '5000',
  MinPrice: '0',
  MaxRange: '5',
  MinRange: '1',
  sortCriteria: 'recommended',
  selectedAmenities: [],
};

export interface SearchFilterStore {
  criteria: FilterCriteria;
  setCriteria(criteria: FilterCriteria): void;
  clear(selectedAmenities: Option[], initialPriceLimits: number[]): void;
}

export const useSearchFilterStore = create<SearchFilterStore>()((set) => ({
  criteria: defaultCriteriaState,
  setCriteria: (criteria) => {
    set(() => ({
      criteria,
    }));
  },
  clear: (selectedAmenities, initialPriceLimits) =>
    set((state) => ({
      ...state,
      criteria: {
        ...defaultCriteriaState,
        selectedAmenities: selectedAmenities,
        MinPrice: initialPriceLimits[0].toString(),
        MaxPrice: initialPriceLimits[1].toString(),
      },
    })),
}));
