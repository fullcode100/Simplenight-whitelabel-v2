import FilterForm from './FilterForm';
import ClearFilterButton from 'components/global/Filters/ClearFilterButton';
import FilterContainer from 'components/global/Filters/FilterContainer';
import { useTranslation } from 'react-i18next';
import FiltersIcon from 'public/icons/assets/filters.svg';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  keywordSearchData: any;
  setAppliedFilters: any;
  setIsOpen: any;
  filtersCount: number;
  minPrice: string;
  setMinPrice(price: string): void;
  maxPrice: string;
  setMaxPrice(price: string): void;
  freeCancellation: boolean;
  setFreeCancellation(freeCancellation: boolean): void;
  minStarRating: string;
  setMinStarRating(rating: string): void;
  maxStarRating: string;
  setMaxStarRating(rating: string): void;
  keywordSearch: string;
  setKeywordSearch(keywordSearch: string): void;
  sortBy: string;
  setSortBy(sortBay: string): void;
}

const initialFilters = {
  keywordSearch: '',
  price: { minPrice: '0', maxPrice: '5000' },
  freeCancellation: false,
  starRating: { minStarRating: '1', maxStarRating: '5' },
  sortBy: 'recommended',
};

const FilterSidebar = ({
  isOpen,
  onClose,
  keywordSearchData,
  setAppliedFilters,
  setIsOpen,
  filtersCount,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  freeCancellation,
  setFreeCancellation,
  minStarRating,
  setMinStarRating,
  maxStarRating,
  setMaxStarRating,
  keywordSearch,
  setKeywordSearch,
  sortBy,
  setSortBy,
}: FilterSidebarProps) => {
  const [t] = useTranslation('global');
  const starRatingLabel = t('customerRating', 'Customer Rating');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t('searchKeywordPlaceholder', 'Venue Name');
  const filtersLabel = t('filters', 'Filters');
  const sortLabel = t('sort', 'Sort');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

  const handleClearFilters = () => {
    setAppliedFilters(initialFilters);
    setMinPrice('0');
    setMaxPrice('5000');
    setFreeCancellation(false);
    setMinStarRating('1');
    setMaxStarRating('5');
    setKeywordSearch('');
    setSortBy('recommended');
  };

  const handleCloseModal = () => {
    onClose();
    setIsOpen(false);
  };

  const filtersApplied = {
    keywordSearch: keywordSearch,
    price: { minPrice: minPrice, maxPrice: maxPrice },
    freeCancellation: freeCancellation,
    starRating: { minStarRating: minStarRating, maxStarRating: maxStarRating },
    sortBy: sortBy,
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    filtersApplied.price.minPrice = value;
    setAppliedFilters(filtersApplied);
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    filtersApplied.price.maxPrice = value;
    setAppliedFilters(filtersApplied);
  };

  const onChangeMinRating = (value: string) => {
    setMinStarRating(value);
    filtersApplied.starRating.minStarRating = value;
    setAppliedFilters(filtersApplied);
  };

  const onChangeMaxRating = (value: string) => {
    setMaxStarRating(value);
    filtersApplied.starRating.maxStarRating = value;
    setAppliedFilters(filtersApplied);
  };

  const onChangeFreeCancellation = (value: boolean) => {
    if (value) {
      filtersApplied.freeCancellation = true;
    } else {
      filtersApplied.freeCancellation = false;
    }
    setFreeCancellation(value);
    setAppliedFilters(filtersApplied);
  };

  const onChangeKeywordSearch = (value: string) => {
    setKeywordSearch(value);
    filtersApplied.keywordSearch = value;
    setAppliedFilters(filtersApplied);
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
    filtersApplied.sortBy = value;
    setAppliedFilters(filtersApplied);
  };

  const priceRangeFilter = {
    minPrice,
    maxPrice,
    onChangeMinPrice,
    onChangeMaxPrice,
  };
  const paymentFilter = {
    freeCancellation,
    onChangeFreeCancellation,
  };
  const starRangeFilter = {
    minStarRating,
    maxStarRating,
    onChangeMinRating,
    onChangeMaxRating,
    starRatingLabel,
  };
  const keywordSearchFilter = {
    keywordSearchLabel: keywordSearchLabel,
    keywordSearch,
    onChangeKeywordSearch,
    keywordSearchPlaceholder: searchKeywordPlaceholder,
    keywordSearchData,
  };

  const sortByselect = {
    sortLabel: sortLabel,
    sortBy,
    onChangeSortBy,
  };

  return (
    <>
      <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8 lg:mt-12 mt-3 relative">
        <FilterContainer>
          <section className="flex items-center justify-between ">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="hover:bg-primary-800 hover:text-white hover:border-white flex flex-row items-center px-2 py-1 border-2 rounded-3xl border-primary-1000 text-primary-1000"
            >
              <FiltersIcon />
              <span className="ml-2">{filtersLabel}</span>
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
        <FilterForm
          sortBySelect={sortByselect}
          priceRangeFilter={priceRangeFilter}
          paymentFilter={paymentFilter}
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
          <FilterForm
            sortBySelect={sortByselect}
            priceRangeFilter={priceRangeFilter}
            paymentFilter={paymentFilter}
            starRangeFilter={starRangeFilter}
            keywordSearchFilter={keywordSearchFilter}
            className="px-5 py-6"
          />
        </FullScreenModal>
      </section>
    </>
  );
};

export default FilterSidebar;
