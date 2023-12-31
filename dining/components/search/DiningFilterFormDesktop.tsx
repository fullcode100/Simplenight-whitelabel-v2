import React from 'react';
import { useTranslation } from 'react-i18next';
import FilterContainer from './filters/FilterContainer';
import PriceRangeFilter from './filters/PriceRangeFilter';
import FilterCollapseTitle from './filters/FilterCollapseTitle';
import { useFilterDining } from 'dining/hooks/useFilterDining';
import SortBy from './filters/SortBy';
import { SortBySelect } from 'dining/constants/sortByOptions';

interface DiningFilterFormProps {
  sortBySelect: SortBySelect;
}

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const DiningFilterFormDesktop = ({ sortBySelect }: DiningFilterFormProps) => {
  const [t] = useTranslation('dining');
  const priceText = t('price', 'Price');
  const { clearFilters, changePrice, minPrice, maxPrice } = useFilterDining();

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{t('filters')}</p>
        <button
          className="text-base font-semibold underline capitalize text-primary-1000"
          onClick={clearFilters}
        >
          {t('clearFilters')}
        </button>
      </section>
    </FilterContainer>
  );
  return (
    <section className="h-full py-4">
      <section className="pr-4">
        <FilterHeader />
        <SortBy
          sortBy={sortBySelect.sortBy ?? ''}
          onChangeSortBy={sortBySelect.onChangeSortBy}
        />
        <Divider className="my-6" />
        <FilterCollapseTitle title={priceText}>
          <PriceRangeFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChangeMinPrice={(value: string) => changePrice(value)}
            onChangeMaxPrice={(value: string) => changePrice(minPrice, value)}
          />
        </FilterCollapseTitle>
        <Divider className="my-4 opacity-0" />
      </section>
    </section>
  );
};

export default DiningFilterFormDesktop;
