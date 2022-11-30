import React, { useEffect, useState } from 'react';
import Button from 'components/global/Button/Button';
import FilterContainer from 'showsAndEvents/components/search/Filters/FilterContainer';
import PriceRangeFilter from 'showsAndEvents/components/search/Filters/PriceRangeFilter';
import SeatsFilter from 'showsAndEvents/components/search/Filters/SeatsFilter';
import { useTranslation } from 'react-i18next';
import Divider from 'components/global/Divider/Divider';

const FilterFormMobile = () => {
  const [t, i18next] = useTranslation('shows');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

  const initialPriceRange = {
    min: '0',
    max: '5000',
  };
  const [minPrice, setMinPrice] = useState<string>(initialPriceRange.min);
  const [maxPrice, setMaxPrice] = useState<string>(initialPriceRange.max);
  const [seats, setSeats] = useState<string>('6');

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
  };

  const onChangeSeats = (value: string) => {
    setSeats(value);
  };

  const FilterHeader = () => (
    <FilterContainer className="mb-1">
      <section className="flex items-center justify-end">
        <button
          className="text-base font-semibold capitalize text-primary-1000"
          onClick={undefined}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );
  return (
    <section className="pb-6 border-b-2">
      <FilterHeader />
      <section className="grid grid-cols-1">
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChangeMinPrice={onChangeMinPrice}
          onChangeMaxPrice={onChangeMaxPrice}
        />
        <Divider className="my-1" />
        <SeatsFilter value={seats} onChangeSeats={onChangeSeats} />
        <Button value={applyFiltersLabel} size="full" className="mt-4" />
      </section>
    </section>
  );
};

export default FilterFormMobile;
