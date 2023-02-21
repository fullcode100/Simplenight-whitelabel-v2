import React, { useEffect, useState } from 'react';
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
import { useFilterShowsAndEvents } from 'showsAndEvents/hooks/useFilterShowsAndEvents';
import useQuery from 'hooks/pageInteraction/useQuery';
import { useDispatch } from 'react-redux';
import { updateShowsAndEventsFilters } from 'showsAndEvents/redux/actions';
import { ShowsSearchResponse } from '../../types/response/ShowsSearchResponse';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface iShowAndEventsFilterFormDesktop {
  handleHideFilters: () => void;
  isMobile?: boolean;
  showsAndEvents: ShowsSearchResponse[];
}

const ShowAndEventsFilterFormDesktop = ({
  handleHideFilters,
  isMobile,
  showsAndEvents,
}: iShowAndEventsFilterFormDesktop) => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const { latitude, longitude } = useQuery();
  const [queryFilter] = useState(router.query);

  const dispatch = useDispatch();

  const { handleFilterShowsAndEvents } = useFilterShowsAndEvents(
    latitude as string,
    longitude as string,
    showsAndEvents,
  );

  const initialPriceRange = {
    min: '0',
    max: '5000',
  };
  const initialSeatsRange = {
    min: '1',
    max: '6',
  };
  const initialDistanceRange = {
    min: '0',
    max: '3000',
  };
  const [minPrice, setMinPrice] = useState<string | number>(
    (queryFilter?.minPrice as string) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string | number>(
    (queryFilter?.maxPrice as string) || initialPriceRange.max,
  );
  const [minSeats, setMinSeats] = useState<string | number>(
    initialSeatsRange.min,
  );
  const [maxSeats, setMaxSeats] = useState<string | number>(
    (queryFilter.seats as string) || initialSeatsRange.max,
  );
  const [minDistance, setMinDistance] = useState<string>(
    initialDistanceRange.min,
  );

  const [maxDistance, setMaxDistance] = useState<string>(
    (queryFilter.distance as string) || initialDistanceRange.max,
  );
  const [t, i18n] = useTranslation('events');

  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const priceText = t('price', 'Price');
  const distanceText = t('distance', 'Distance');
  const seatsText = t('seats', 'Seats');

  const handleClearFilters = () => {
    setMinPrice((queryFilter?.minPrice as string) || initialPriceRange.min);
    setMinDistance(initialDistanceRange.min);
    setMinSeats(initialSeatsRange.min);
    setMaxPrice((queryFilter?.maxPrice as string) || initialPriceRange.max);
    setMaxDistance(
      (queryFilter.distance as string) || initialDistanceRange.max,
    );
    setMaxSeats((queryFilter.seats as string) || initialSeatsRange.max);
    dispatch(updateShowsAndEventsFilters({}));
  };

  useEffect(() => {
    handleFilterShowsAndEvents('minPrice', minPrice.toString());
  }, [minPrice]);

  useEffect(() => {
    handleFilterShowsAndEvents('maxPrice', maxPrice.toString());
  }, [maxPrice]);

  useEffect(() => {
    handleFilterShowsAndEvents('minSeats', minSeats.toString());
  }, [minSeats]);

  useEffect(() => {
    const baseMaxSeat = Number(
      (queryFilter.seats as string) || initialSeatsRange.max,
    );
    const newMaxSeatFilter =
      Number(maxSeats) < baseMaxSeat ? maxSeats.toString() : undefined;
    handleFilterShowsAndEvents('maxSeats', newMaxSeatFilter);
  }, [maxSeats]);

  useEffect(() => {
    handleFilterShowsAndEvents('minDistance', minDistance);
  }, [minDistance]);

  useEffect(() => {
    const baseMaxDistance = Number(
      (queryFilter.distance as string) || initialDistanceRange.max,
    );
    const newMaxDistanceFilter =
      Number(maxDistance) < Number(baseMaxDistance) ? maxDistance : undefined;
    handleFilterShowsAndEvents('maxDistance', newMaxDistanceFilter);
  }, [maxDistance]);

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <section className="flex items-center">
          <button
            className="text-base font-semibold underline capitalize text-primary-1000"
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
          minValue={Number(minPrice)}
          maxValue={Number(maxPrice)}
          onChangeMinPrice={setMinPrice}
          onChangeMaxPrice={setMaxPrice}
          setMinValue={(value) => setMinPrice(Number(value))}
          setMaxValue={(value) => setMaxPrice(Number(value))}
        />
      </FilterCollapseTitle>
      <Divider className="my-6" />
      <FilterCollapseTitle title={distanceText}>
        <DistanceFilter
          minValue={minDistance}
          maxValue={maxDistance}
          value={maxDistance}
          onChangeDistance={setMaxDistance}
          onChangeMinDistance={setMinDistance}
          onChangeMaxDistance={setMaxDistance}
        />
      </FilterCollapseTitle>
      <Divider className="my-6" />
      <FilterCollapseTitle title={seatsText}>
        <SeatsFilter
          minValue={Number(minSeats)}
          maxValue={Number(maxSeats)}
          value={Number(maxSeats)}
          onChangeMaxSeats={setMaxSeats}
          onChangeMinSeats={setMinSeats}
          onChangeSeats={setMaxSeats}
          setMaxValue={(value) => setMaxSeats(Number(value))}
          setMinValue={(value) => setMinSeats(Number(value))}
        />
      </FilterCollapseTitle>
      <section className="text-center lg:hidden">
        <Button
          onClick={handleHideFilters}
          value={'Apply Filters'}
          size="w-60 h-11 text-base leading-[18px]"
          className="mt-4 mb-12"
        />
      </section>
    </section>
  );
};

export default ShowAndEventsFilterFormDesktop;
