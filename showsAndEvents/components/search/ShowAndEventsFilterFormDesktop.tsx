import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import SeatsFilter from './Filters/SeatsFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import FilterContainer from './Filters/FilterContainer';

import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import DistanceFilter from './Filters/DistanceFilter';
import FilterCollapseTitle from './Filters/FilterCollapseTitle';
import Button from 'components/global/Button/Button';
import Close from 'public/icons/assets/close.svg';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface iShowAndEventsFilterFormDesktop {
  handleHideFilters: () => void;
  isMobile?: boolean;
}

const ShowAndEventsFilterFormDesktop = ({
  handleHideFilters,
  isMobile,
}: iShowAndEventsFilterFormDesktop) => {
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
  const [minSeats, setMinSeats] = useState<string>('1');
  const [maxSeats, setMaxSeats] = useState<string>(
    (queryFilter.seats as string) || '6',
  );
  const [distance, setDistance] = useState<string>(
    (queryFilter.distance as string) || '3000',
  );

  const [minDistance, setMinDistance] = useState<string>('0');

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
    !isMobile &&
      setQueryParams({
        minPrice: value,
        ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
      });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    !isMobile &&
      setQueryParams({
        maxPrice: value,
        ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
      });
  };

  const onChangeSeats = (value: string) => {
    setSeats(value);
    !isMobile &&
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
    // Ultil we have a max/min seats params available for BE
    !isMobile &&
      setQueryParams({
        seats: value,
      });
  };

  const onChangeDistance = (value: string) => {
    setDistance(value);
    !isMobile &&
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
    // Ultil we have a max/min seats params available for BE
    !isMobile &&
      setQueryParams({
        distance: value,
      });
  };

  const handleAplyFilters = () => {
    const isTotalPrice = ((minPrice || maxPrice) && 'false') || 'true';
    isMobile &&
      setQueryParams({
        minPrice,
        maxPrice,
        isTotalPrice,
        distance: maxDistance != distance ? maxDistance : distance,
        seats: maxSeats != seats ? maxSeats : seats,
      });
    handleHideFilters();
  };

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <section className="items-center flex">
          <button
            className="text-base font-semibold capitalize text-primary-1000 underline"
            onClick={handleClearFilters}
          >
            {clearFiltersText}
          </button>
          {isMobile && (
            <button className="ml-2" onClick={handleHideFilters}>
              <Close />
            </button>
          )}
        </section>
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
      <section className="text-center lg:hidden">
        <Button
          onClick={handleAplyFilters}
          value={'Apply Filters'}
          size="w-60 h-11 text-base leading-[18px]"
          className="mt-4 mb-12"
        />
      </section>
    </section>
  );
};

export default ShowAndEventsFilterFormDesktop;
