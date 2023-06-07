import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import { create } from 'zustand';

export interface FilterAppliedStore {
  sortByVal: string;
  keywordSearch: string;
  minPriceFilter: number;
  maxPriceFilter: number;
  minStarRating: string;
  maxStarRating: string;
  selectedAmenities: Option[];
  setSortByVal: (newSortByVal: string) => void;
  setKeywordSearch: (newKeywordSearch: string) => void;
  setMinPriceFilter: (newMinPrice: number) => void;
  setMaxPriceFilter: (newMaxPrice: number) => void;
  setMinStarRating: (newMinStarRating: string) => void;
  setMaxStarRating: (newMaxStarRating: string) => void;
  setSelectedAmenities: (newSelectedAmenities: Option[]) => void;
}

export const useFilterAppliedStore = create<FilterAppliedStore>()((set) => ({
  sortByVal: 'recommended',
  keywordSearch: '',
  minPriceFilter: 0,
  maxPriceFilter: 5000,
  minStarRating: '1',
  maxStarRating: '5',
  selectedAmenities: [],
  setSortByVal: (newSortByVal) => set({ sortByVal: newSortByVal }),
  setKeywordSearch: (newKeywordSearch) =>
    set({ keywordSearch: newKeywordSearch }),
  setMinPriceFilter: (newMinPrice) => set({ minPriceFilter: newMinPrice }),
  setMaxPriceFilter: (newMaxPrice) => set({ maxPriceFilter: newMaxPrice }),
  setMinStarRating: (newMinStarRating) =>
    set({ minStarRating: newMinStarRating }),
  setMaxStarRating: (newMaxStarRating) =>
    set({ maxStarRating: newMaxStarRating }),
  setSelectedAmenities: (newSelectedAmenities) =>
    set({ selectedAmenities: newSelectedAmenities }),
}));
