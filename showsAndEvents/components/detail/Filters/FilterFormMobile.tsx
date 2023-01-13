import React, { useEffect, useState } from 'react';
import Button from 'components/global/Button/Button';
import FilterContainer from 'showsAndEvents/components/search/Filters/FilterContainer';
import PriceRangeFilter from 'showsAndEvents/components/search/Filters/PriceRangeFilter';
import SeatsFilter from 'showsAndEvents/components/search/Filters/SeatsFilter';
import { useTranslation } from 'react-i18next';
import Divider from 'components/global/Divider/Divider';
import { filters, iDetailFilterFormProps } from './types';

const FilterFormMobile = ({
  onChange,
  maxPrice,
  maxSeats,
}: iDetailFilterFormProps) => {
  const [t, i18next] = useTranslation('shows');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

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

  const applyFilters = () => {
    onChange({
      minPrice: `${minPriceState}`,
      maxPrice: `${maxPriceState}`,
      minSeats: `${minSeatsState}`,
      maxSeats: `${maxSeatsState}`,
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
  };

  const onChangeMaxSeats = (value: string) => {
    setMaxSeats(+value);
  };

  const onChangeMinSeats = (value: string) => {
    setMinSeats(+value);
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
          minValue={minPriceState}
          maxValue={maxPriceState}
          max={parseInt(initialPriceRange.max)}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChangeMinPrice={() => {}}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChangeMaxPrice={() => {}}
          setMinValue={setMinPrice}
          setMaxValue={setMaxPrice}
          step={1}
          minDifference={1}
        />
        <Divider className="my-1" />
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
