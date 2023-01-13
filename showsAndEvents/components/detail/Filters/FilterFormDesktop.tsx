import React, { useEffect, useState } from 'react';
import FilterCollapseTitle from 'showsAndEvents/components/search/Filters/FilterCollapseTitle';
import FilterContainer from 'showsAndEvents/components/search/Filters/FilterContainer';
import PriceRangeFilter from 'showsAndEvents/components/search/Filters/PriceRangeFilter';
import SeatsFilter from 'showsAndEvents/components/search/Filters/SeatsFilter';
import { useTranslation } from 'react-i18next';
import { filters, iDetailFilterFormProps } from './types';

const FilterFormDesktop = ({
  onChange,
  maxPrice,
  maxSeats,
}: iDetailFilterFormProps) => {
  const [t, i18next] = useTranslation('shows');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const priceText = t('price', 'Price');
  const seatsText = t('seats', 'Seats');

  const initialPriceRange = {
    min: '0',
    max: maxPrice ?? '3000',
  };
  const initialSeats = {
    min: '1',
    max: Number(maxSeats) < 6 && maxSeats ? maxSeats : '6',
  };
  const [minPriceState, setMinPrice] = useState<number>(+initialPriceRange.min);
  const [maxPriceState, setMaxPrice] = useState<number>(+initialPriceRange.max);
  const [minSeatsState, setMinSeats] = useState<number>(+initialSeats.min);
  const [maxSeatsState, setMaxSeats] = useState<number>(+initialSeats.max);

  const onChangeUpdate = (data: Partial<filters>) => {
    onChange({
      minPrice: `${minPriceState}`,
      maxPrice: `${maxPriceState}`,
      minSeats: `${minSeatsState}`,
      maxSeats: `${maxSeatsState}`,
      ...data,
    });
  };

  const resetFilters = () => {
    const initObj: filters = {
      minPrice: initialPriceRange.min,
      maxPrice: initialPriceRange.max,
      minSeats: initialSeats.min,
      maxSeats: initialSeats.max,
    };
    setMinPrice(+initObj.minPrice);
    setMaxPrice(+initObj.maxPrice);
    setMinSeats(+initObj.minSeats);
    setMaxSeats(+initObj.maxSeats);
    onChange(initObj);
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(+value);
    onChangeUpdate({
      minPrice: value,
    });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(+value);
    onChangeUpdate({
      maxPrice: value,
    });
  };

  const onChangeMinSeats = (value: string) => {
    setMinSeats(+value);
    onChangeUpdate({
      minSeats: value,
    });
  };

  const onChangeMaxSeats = (value: string) => {
    setMaxSeats(+value);
    onChangeUpdate({
      maxSeats: value,
    });
  };

  const FilterHeader = () => (
    <FilterContainer className="mb-1">
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="text-base font-semibold capitalize text-primary-1000 underline"
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
              minValue={minPriceState}
              maxValue={maxPriceState}
              max={parseInt(initialPriceRange.max)}
              onChangeMinPrice={onChangeMinPrice}
              onChangeMaxPrice={onChangeMaxPrice}
              step={1}
              minDifference={1}
              setMinValue={setMinPrice}
              setMaxValue={setMaxPrice}
            />
          </FilterCollapseTitle>
        </section>
        <section>
          <FilterCollapseTitle title={seatsText}>
            <SeatsFilter
              value={maxSeatsState < 6 ? maxSeatsState : 6}
              minValue={minSeatsState}
              maxValue={maxSeatsState < 6 ? maxSeatsState : 6}
              onChangeSeats={onChangeMaxSeats}
              setMaxValue={setMaxSeats}
              setMinValue={setMinSeats}
              onChangeMaxSeats={onChangeMaxSeats}
              onChangeMinSeats={onChangeMinSeats}
            />
          </FilterCollapseTitle>
        </section>
      </section>
    </section>
  );
};

export default FilterFormDesktop;
