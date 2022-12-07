import React, { useEffect, useState } from 'react';
import FilterCollapseTitle from 'showsAndEvents/components/search/Filters/FilterCollapseTitle';
import FilterContainer from 'showsAndEvents/components/search/Filters/FilterContainer';
import PriceRangeFilter from 'showsAndEvents/components/search/Filters/PriceRangeFilter';
import SeatsFilter from 'showsAndEvents/components/search/Filters/SeatsFilter';
import { useTranslation } from 'react-i18next';

export type filters = {
  minPrice: string;
  maxPrice: string;
  seats: string;
};

const FilterFormDesktop = ({
  onChange,
  max,
}: {
  onChange(filter: filters): void;
  max?: string;
}) => {
  const [t, i18next] = useTranslation('shows');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const priceText = t('price', 'Price');
  const seatsText = t('seats', 'Seats');

  const initialPriceRange = {
    min: '0',
    max: max ?? '3000',
  };
  const initialSeats = '1';
  const [minPrice, setMinPrice] = useState<string>(initialPriceRange.min);
  const [maxPrice, setMaxPrice] = useState<string>(initialPriceRange.max);
  const [seats, setSeats] = useState<string>(initialSeats);

  const onChangeUpdate = (data: Partial<filters>) => {
    onChange({
      minPrice,
      maxPrice,
      seats,
      ...data,
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
    onChange(initObj);
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    onChangeUpdate({
      minPrice: value,
    });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    onChangeUpdate({
      maxPrice: value,
    });
  };

  const onChangeSeats = (value: string) => {
    setSeats(value);
    onChangeUpdate({
      seats: value,
    });
  };

  const FilterHeader = () => (
    <FilterContainer className="mb-1">
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
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
    <section className="pb-6">
      <FilterHeader />
      <section className="grid grid-cols-2 gap-8">
        <section>
          <FilterCollapseTitle title={priceText}>
            <PriceRangeFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              max={parseInt(initialPriceRange.max)}
              onChangeMinPrice={onChangeMinPrice}
              onChangeMaxPrice={onChangeMaxPrice}
              step={1}
              minDifference={1}
            />
          </FilterCollapseTitle>
        </section>
        <section>
          <FilterCollapseTitle title={seatsText}>
            <SeatsFilter value={seats} onChangeSeats={onChangeSeats} />
          </FilterCollapseTitle>
        </section>
      </section>
    </section>
  );
};

export default FilterFormDesktop;
