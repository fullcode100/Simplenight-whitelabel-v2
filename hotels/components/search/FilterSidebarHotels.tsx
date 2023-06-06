import { useTranslation } from 'react-i18next';

import FilterContainer from './Filters/FilterContainer';
import FiltersIcon from 'public/icons/assets/filters.svg';
import ClearFilterButton from 'components/global/Filters/ClearFilterButton';

import { FilterCriteria } from 'hotels/hooks/useFilterHotels';
import {
  MAX_STAR_RATING_INITIAL_VALUE,
  MIN_STAR_RATING_INITIAL_VALUE,
  SORTBY_INITIAL_VALUE,
  sortByFilters,
} from './HotelResultsDisplay';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import FilterFormHotels from './Filters/FilterFormHotels';

export interface FilterSidebarHotelsProps {
  keywordState: string;
  setKeywordState: React.Dispatch<React.SetStateAction<string>>;
  limitsPrice: number[];
  filtersCount: number;
  setCriteria: (criteria: FilterCriteria) => void;
  keywordSearchData: string[];
  keywordSearch: string;
  setKeywordSearch: React.Dispatch<React.SetStateAction<string>>;
  sortByVal: string;
  setSortByVal: React.Dispatch<React.SetStateAction<string>>;
  isOpen: any;
  onClose: any;
  handleFilterHotels: (criteria: FilterCriteria) => void;
  loading: boolean;
  resetFilters: () => void;
  criteria: FilterCriteria;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minStarRating: string;
  setMinStarRating: React.Dispatch<React.SetStateAction<string>>;
  maxStarRating: string;
  setMaxStarRating: React.Dispatch<React.SetStateAction<string>>;
  isListView: boolean;
}

const FilterSidebarHotels = ({
  keywordState,
  setKeywordState,
  limitsPrice,
  filtersCount,
  setCriteria,
  keywordSearchData,
  keywordSearch,
  setKeywordSearch,
  sortByVal,
  setSortByVal,
  isOpen,
  onClose,
  handleFilterHotels,
  resetFilters,
  criteria,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minStarRating,
  setMinStarRating,
  maxStarRating,
  setMaxStarRating,
  isListView,
}: FilterSidebarHotelsProps) => {
  const [t] = useTranslation('hotels');
  const filtersText = t('filters', 'Filters');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t('searchKeywordPlaceholder', 'Venue Name');
  const starRatingLabel = t('starRating', 'Star Rating');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

  const handleClearFilters = () => {
    resetFilters();
    setMinStarRating(MIN_STAR_RATING_INITIAL_VALUE);
    setMaxStarRating(MAX_STAR_RATING_INITIAL_VALUE);
    setSortByVal(SORTBY_INITIAL_VALUE);
    setKeywordSearch('');
    setKeywordState('');
  };

  const handleCloseModal = () => {
    onClose();
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(parseInt(value));
    handleFilterHotels({ ...criteria, MinPrice: value });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(parseInt(value));
    handleFilterHotels({ ...criteria, MaxPrice: value });
  };

  const onChangeMinRating = (value: string) => {
    setMinStarRating(value);
    handleFilterHotels({ ...criteria, MinRange: value });
  };

  const onChangeMaxRating = (value: string) => {
    setMaxStarRating(value);
    handleFilterHotels({ ...criteria, MaxRange: value });
  };

  const onChangeSortBy = (value: string) => {
    const typedValue: sortByFilters = value as sortByFilters;
    setSortByVal(value);
    switch (typedValue) {
      case 'sortByStarRatingAsc':
        setCriteria({ ...criteria, sortCriteria: 'ratingLowFirst' });
        break;
      case 'sortByStarRatingDesc':
        setCriteria({ ...criteria, sortCriteria: 'ratingHighFirst' });
        break;
      case 'sortByPriceAsc':
        setCriteria({ ...criteria, sortCriteria: 'priceLowFirst' });
        break;
      case 'sortByPriceDesc':
        setCriteria({ ...criteria, sortCriteria: 'priceHighFirst' });
        break;
      case 'recommended':
        setCriteria({ ...criteria, sortCriteria: 'recommended' });
        break;
    }
  };

  const onChangeKeywordSearch = (value: string) => {
    setKeywordSearch(value);
    setCriteria({ ...criteria, keywordSearch: value });
  };

  const keywordSearchFilter = {
    keywordSearchLabel: keywordSearchLabel,
    keywordSearch,
    onChangeKeywordSearch,
    keywordSearchPlaceholder: searchKeywordPlaceholder,
    keywordSearchData,
    setKeywordState,
    keywordState,
  };

  const sortByselect = {
    sortBy: sortByVal,
    onChangeSortBy: onChangeSortBy,
  };

  const priceRangeFilter = {
    minPrice,
    maxPrice,
    onChangeMinPrice,
    onChangeMaxPrice,
  };

  const starRangeFilter = {
    minStarRating,
    maxStarRating,
    onChangeMinRating,
    onChangeMaxRating,
    starRatingLabel,
  };

  const FilterHeader = () => (
    <FilterContainer>
      <section className="relative flex items-center justify-between ">
        <button
          onClick={() => {
            onClose();
          }}
          className="hover:bg-primary-800 hover:text-white hover:border-white flex flex-row items-center px-2 py-1 border-2 rounded-3xl border-primary-1000 text-primary-1000"
        >
          <FiltersIcon />
          <span className="ml-2">{filtersText}</span>
        </button>
        <ClearFilterButton handleClearFilters={handleClearFilters} />
        <section className="absolute left-16 -top-3">
          <div className="w-6 h-6 bg-primary-1000 rounded-full flex justify-center items-center">
            <span className="text-white font-light text-xs">
              {filtersCount}
            </span>
          </div>
        </section>
      </section>
    </FilterContainer>
  );

  return (
    <>
      <section
        className={`hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8 lg:mt-12 mt-3 relative ${
          !isListView ? 'ml-20' : ''
        }`}
      >
        <FilterHeader />
        <FilterFormHotels
          limitsPrice={limitsPrice}
          sortBySelect={sortByselect}
          priceRangeFilter={priceRangeFilter}
          starRangeFilter={starRangeFilter}
          keywordSearchFilter={keywordSearchFilter}
        />
      </section>
      <section className="lg:hidden">
        <FullScreenModal
          open={isOpen}
          closeModal={handleCloseModal}
          title="Filters"
          primaryButtonText={applyFiltersLabel}
          primaryButtonAction={handleCloseModal}
          headerAction={
            <ClearFilterButton handleClearFilters={handleClearFilters} />
          }
        >
          <FilterFormHotels
            limitsPrice={limitsPrice}
            sortBySelect={sortByselect}
            priceRangeFilter={priceRangeFilter}
            starRangeFilter={starRangeFilter}
            keywordSearchFilter={keywordSearchFilter}
            className="px-5 py-6"
          />
        </FullScreenModal>
      </section>
    </>
  );
};

export default FilterSidebarHotels;
