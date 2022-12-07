import React, { useEffect, useState } from 'react';
import Button from 'components/global/Button/Button';
import FilterContainer from 'showsAndEvents/components/search/Filters/FilterContainer';
import PriceRangeFilter from 'showsAndEvents/components/search/Filters/PriceRangeFilter';
import SeatsFilter from 'showsAndEvents/components/search/Filters/SeatsFilter';
import { useTranslation } from 'react-i18next';
import Divider from 'components/global/Divider/Divider';

export type filters = {
  minPrice: string;
  maxPrice: string;
  seats: string;
};

const FilterFormMobile = ({
  onChange,
  max,
}: {
  onChange(filter: filters): void;
  max?: string;
}) => {
  const [t, i18next] = useTranslation('shows');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

  const initialPriceRange = {
    min: '0',
    max: max ?? '3000',
  };
  const initialSeats = '1';
  const [minPrice, setMinPrice] = useState<string>(initialPriceRange.min);
  const [maxPrice, setMaxPrice] = useState<string>(initialPriceRange.max);
  const [seats, setSeats] = useState<string>(initialSeats);

  const applyFilters = () => {
    onChange({
      minPrice,
      maxPrice,
      seats,
    });
  };

  const resetFilters = () => {
    const initObj = {
      minPrice: initialPriceRange.min,
      maxPrice: initialPriceRange.max,
      seats: initialSeats,
    };
    setMinPrice(initObj.minPrice);
    setMaxPrice(initObj.maxPrice);
    setSeats(initObj.seats);
  };

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
          onClick={resetFilters}
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
          max={parseInt(initialPriceRange.max)}
          onChangeMinPrice={onChangeMinPrice}
          onChangeMaxPrice={onChangeMaxPrice}
          step={1}
          minDifference={1}
        />
        <Divider className="my-1" />
        <SeatsFilter value={seats} onChangeSeats={onChangeSeats} />
        <Button
          value={applyFiltersLabel}
          size="full"
          className="mt-4"
          onClick={applyFilters}
        />
      </section>
    </section>
  );
};

export default FilterFormMobile;
