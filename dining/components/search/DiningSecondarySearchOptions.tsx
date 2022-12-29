import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import PriceRangeFilter from './filters/PriceRangeFilter';
import FilterIcon from 'public/icons/assets/filter.svg';
import { useFilterDining } from 'dining/hooks/useFilterDining';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const DiningSecondarySearchOptions = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const { clearFilters, changePrice, minPrice, maxPrice } = useFilterDining();

  const [t] = useTranslation('dining');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
  };

  const FilterForm = (
    <section
      className="px-5 py-4 overflow-y-auto"
      style={{ maxHeight: '75vh' }}
    >
      <Divider className="my-6" />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMinPrice={(value: string) => changePrice(value)}
        onChangeMaxPrice={(value: string) => changePrice(minPrice, value)}
      />
      <Divider className="my-6" />
    </section>
  );

  const ClearFilterButton = () => (
    <button
      className="text-base font-semibold underline text-primary-1000"
      onClick={clearFilters}
    >
      {clearFiltersText}
    </button>
  );

  const Modals = (
    <FullScreenModal
      open={isFilterModalOpen}
      closeModal={() => setFilterModalOpen(false)}
      title={filtersLabel}
      primaryButtonText={applyFiltersLabel}
      primaryButtonAction={() => handleDispatchFilters()}
      headerAction={<ClearFilterButton />}
    >
      {FilterForm}
    </FullScreenModal>
  );

  return (
    <section className="lg:hidden">
      <button
        className="flex items-center gap-2 py-1 me-2 lg:hidden"
        onClick={handleFilterButtonClick}
      >
        <span className="text-primary-1000">
          <FilterIcon />
        </span>
        <span className="flex-1 text-xs font-semibold text-left text-dark-1000">
          {t('filter', 'Filter')}
        </span>
      </button>
      {Modals}
    </section>
  );
};

export default DiningSecondarySearchOptions;
