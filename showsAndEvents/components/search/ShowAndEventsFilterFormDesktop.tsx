import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import SeatsFilter from './Filters/SeatsFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import FilterContainer from './Filters/FilterContainer';

import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import DistanceFilter from './Filters/DistanceFilter';
import FilterCollapseTitle from './Filters/FilterCollapseTitle';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const ShowAndEventsFilterFormDesktop = () => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const [queryFilter, setQueryFilters] = useState(router.query);

  const initialPriceRange = {
    min: '0',
    max: '5000',
  };
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.minPrice as string) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter?.maxPrice as string) || initialPriceRange.max,
  );
  const [seats, setSeats] = useState<string>(
    (queryFilter.seats as string) || '6',
  );
  const [minSeats, setMinSeats] = useState<string>(
    (queryFilter.seats as string) || '1',
  );
  const [maxSeats, setMaxSeats] = useState<string>(
    (queryFilter.seats as string) || '6',
  );
  const [distance, setDistance] = useState<string>(
    (queryFilter.distance as string) || '3000',
  );

  const [minDistance, setMinDistance] = useState<string>(
    (queryFilter.distance as string) || '0',
  );

  const [maxDistance, setMaxDistance] = useState<string>(
    (queryFilter.distance as string) || '3000',
  );
  const [t, i18n] = useTranslation('events');

  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const priceText = t('price', 'Price');
  const distanceText = t('distance', 'Distance');
  const seatsText = t('seats', 'Seats');

  const handleClearFilters = () => {
    setQueryParams({
      minPrice: '',
      maxPrice: '',
      isTotalPrice: '',
      distance: '',
      seats: '',
    });
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    setQueryParams({
      minPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    setQueryParams({
      maxPrice: value,
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
    });
  };

  const onChangeSeats = (value: string) => {
    setSeats(value);
    setQueryParams({
      seats: value,
    });
  };

  const onChangeMinSeats = (value: string) => {
    setMinSeats(value);
    // setQueryParams({
    //   minSeats: value,
    // });
  };

  const onChangeMaxSeats = (value: string) => {
    setMaxSeats(value);
    // setQueryParams({
    //   maxSeats: value,
    // });
  };

  const onChangeDistance = (value: string) => {
    setDistance(value);
    setQueryParams({
      distance: value,
    });
  };

  const onChangeMinDistance = (value: string) => {
    setMinDistance(value);
    // setQueryParams({
    //   distance: value,
    // });
  };

  const onChangeMaxDistance = (value: string) => {
    setMaxDistance(value);
    // setQueryParams({
    //   distance: value,
    // });
  };

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="text-base font-semibold capitalize text-primary-1000 underline"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );

  return (
    <section className="h-full pr-4">
      <FilterHeader />
      <Divider className="my-6" />
      <FilterCollapseTitle title={priceText}>
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChangeMinPrice={onChangeMinPrice}
          onChangeMaxPrice={onChangeMaxPrice}
        />
      </FilterCollapseTitle>
      <Divider className="my-6" />
      <FilterCollapseTitle title={distanceText}>
        <DistanceFilter
          minValue={minDistance}
          maxValue={maxDistance}
          value={distance}
          onChangeDistance={onChangeDistance}
          onChangeMinDistance={onChangeMinDistance}
          onChangeMaxDistance={onChangeMaxDistance}
        />
      </FilterCollapseTitle>
      <Divider className="my-6" />
      <FilterCollapseTitle title={seatsText}>
        <SeatsFilter
          minValue={minSeats}
          maxValue={maxSeats}
          value={seats}
          onChangeMaxSeats={onChangeMaxSeats}
          onChangeMinSeats={onChangeMinSeats}
          onChangeSeats={onChangeSeats}
        />
      </FilterCollapseTitle>
    </section>
  );
};

export default ShowAndEventsFilterFormDesktop;
