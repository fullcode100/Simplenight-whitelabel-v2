import { useTranslation } from 'react-i18next';

import FilterContainer from './FilterContainer';
import FiltersIcon from 'public/icons/assets/filters.svg';
import ClearFilterButton from 'components/global/Filters/ClearFilterButton';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import FilterFormDining from './FilterFormDining';
import { useFilterDining } from 'dining/hooks/useFilterDining';
import {
  AllowsReservationFilterProps,
  SortBySelect,
} from 'dining/constants/sortByOptions';

export interface FilterSidebarDiningProps {
  filtersCount: number;
  isOpen: any;
  onClose: any;
  sortBySelect: SortBySelect;
  onMinRating: (range: number) => void;
  onMaxRating: (range: number) => void;
  rating: { min: number; max: number };
}

const FilterSidebarDining = ({
  filtersCount,
  isOpen,
  onClose,
  sortBySelect,
  onMinRating,
  onMaxRating,
  rating,
}: FilterSidebarDiningProps) => {
  const [t] = useTranslation('dining');
  const filtersText = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const { clearFilters } = useFilterDining();

  const handleClearFilters = () => {
    clearFilters();
    onMinRating(1);
    onMaxRating(5);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const FilterHeader = () => (
    <FilterContainer>
      <section className="relative flex items-center justify-between ">
        <button
          onClick={() => {
            onClose();
          }}
          className="flex flex-row items-center px-2 py-1 border-2 hover:bg-primary-800 hover:text-white hover:border-white rounded-3xl border-primary-1000 text-primary-1000"
        >
          <FiltersIcon />
          <span className="ml-2">{filtersText}</span>
        </button>
        <ClearFilterButton handleClearFilters={handleClearFilters} />
        <section className="absolute left-16 -top-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-1000">
            <span className="text-xs font-light text-white">
              {filtersCount}
            </span>
          </div>
        </section>
      </section>
    </FilterContainer>
  );

  return (
    <>
      <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8 lg:mt-12 mt-3 relative">
        <FilterHeader />
        <FilterFormDining
          sortBySelect={sortBySelect}
          onMinRating={onMinRating}
          onMaxRating={onMaxRating}
          rating={rating}
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
          <FilterFormDining
            sortBySelect={sortBySelect}
            className="px-5 py-6"
            onMinRating={onMinRating}
            onMaxRating={onMaxRating}
            rating={rating}
          />
        </FullScreenModal>
      </section>
    </>
  );
};

export default FilterSidebarDining;
