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
import { Option } from 'components/global/MultipleSelect/MultipleSelect';

export interface FilterSidebarHotelsProps {
  limitsPrice: number[];
  filtersCount: number;
  setCriteria: (criteria: FilterCriteria) => void;
  keywordSearchData: string[];
  keywordSearch: string;
  setKeywordSearch: (newKeywordSearch: string) => void;
  sortByVal: string;
  setSortByVal: (newSortByVal: string) => void;
  isOpen: any;
  onClose: any;
  handleFilterHotels: (criteria: FilterCriteria) => void;
  loading: boolean;
  resetFilters: () => void;
  criteria: FilterCriteria;
  minPrice: number;
  setMinPrice: (newMinPrice: number) => void;
  maxPrice: number;
  setMaxPrice: (newMaxPrice: number) => void;
  minStarRating: string;
  setMinStarRating: (newMinStarRating: string) => void;
  maxStarRating: string;
  setMaxStarRating: (newMaxStarRating: string) => void;
  amenitiesOptions: Option[];
  selectedAmenities: Option[];
  setSelectedAmenities: (newSelectedAmenities: Option[]) => void;
  isListView: boolean;
}

const FilterSidebarHotels = ({
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
  amenitiesOptions,
  selectedAmenities,
  setSelectedAmenities,
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
    setSelectedAmenities([]);
    setMinPrice(limitsPrice[0] || 0);
    setMaxPrice(limitsPrice[1] || 5000);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleDeleteAmenity = () => {
    setSelectedAmenities([]);
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
        setCriteria({ ...criteria, sortCriteria: 'sortByStarRatingAsc' });
        break;
      case 'sortByStarRatingDesc':
        setCriteria({ ...criteria, sortCriteria: 'sortByStarRatingDesc' });
        break;
      case 'sortByPriceAsc':
        setCriteria({ ...criteria, sortCriteria: 'sortByPriceAsc' });
        break;
      case 'sortByPriceDesc':
        setCriteria({ ...criteria, sortCriteria: 'sortByPriceDesc' });
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

  const onChangeAmenities = (newOption: Option) => {
    if (selectedAmenities.includes(newOption)) {
      if (selectedAmenities.length === 1) return;
      const amenitiesChanged = selectedAmenities.filter(
        (option) => option.value !== newOption.value,
      );
      setSelectedAmenities(amenitiesChanged);
      setCriteria({ ...criteria, selectedAmenities: amenitiesChanged });
    } else {
      const newSelectedAmenities = [...selectedAmenities, newOption];
      setCriteria({
        ...criteria,
        selectedAmenities: newSelectedAmenities,
      });
      setSelectedAmenities(newSelectedAmenities);
    }
  };

  const keywordSearchFilter = {
    keywordSearchLabel: keywordSearchLabel,
    keywordSearch,
    setKeywordSearch,
    onChangeKeywordSearch,
    keywordSearchPlaceholder: searchKeywordPlaceholder,
    keywordSearchData,
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

  const amenitiesFilter = {
    selectedAmenities,
    onChangeAmenities,
    handleDeleteAmenity,
    amenitiesOptions,
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
        className={`hidden lg:min-h-[1000px] lg:block lg:min-w-[16rem] lg:max-w-[18rem] lg:w-[25%] lg:mr-8 lg:mt-12 mt-3 relative ${
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
          amenitiesFilter={amenitiesFilter}
          className="pb-36"
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
          classNameFooterModal="fixed z-[110] bottom-0 left-0 w-full"
        >
          <FilterFormHotels
            limitsPrice={limitsPrice}
            sortBySelect={sortByselect}
            priceRangeFilter={priceRangeFilter}
            starRangeFilter={starRangeFilter}
            keywordSearchFilter={keywordSearchFilter}
            amenitiesFilter={amenitiesFilter}
            className="px-5 py-6"
          />
        </FullScreenModal>
      </section>
    </>
  );
};

export default FilterSidebarHotels;
