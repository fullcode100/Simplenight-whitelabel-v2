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
import FiltersIcon from 'public/icons/assets/filters.svg';
import { useSearchFilterStore } from 'hooks/showsAndEvents/useSearchFilterStore';
import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface iShowAndEventsFilterFormDesktop {
  handleHideFilters: () => void;
  isMobile?: boolean;
  showsAndEvents: SearchItem[];
  onClose: () => void;
  resultAmount: boolean;
}

const ShowAndEventsFilterFormDesktop = ({
  handleHideFilters,
  isMobile,
  showsAndEvents,
  onClose,
  resultAmount,
}: iShowAndEventsFilterFormDesktop) => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const { latitude, longitude } = useQuery();
  const [queryFilter] = useState(router.query);

  const setFilters = useSearchFilterStore((state) => state.setFilters);

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

  const getCounter = (): number => {
    let list: string[] = [];
    if (minPrice > initialPriceRange.min || maxPrice > initialPriceRange.max) {
      list.push('price');
    } else {
      list = list.filter((e) => e !== 'price');
    }

    if (minSeats > initialSeatsRange.min || maxPrice > initialSeatsRange.max) {
      list.push('seats');
    } else {
      list = list.filter((e) => e !== 'seats');
    }

    if (
      minDistance > initialDistanceRange.min ||
      maxDistance > initialDistanceRange.max
    ) {
      list.push('distance');
    } else {
      list = list.filter((e) => e !== 'distance');
    }
    return list.length;
  };

  const handleClearFilters = () => {
    setMinPrice((queryFilter?.minPrice as string) || initialPriceRange.min);
    setMinDistance(initialDistanceRange.min);
    setMinSeats(initialSeatsRange.min);
    setMaxPrice((queryFilter?.maxPrice as string) || initialPriceRange.max);
    setMaxDistance(
      (queryFilter.distance as string) || initialDistanceRange.max,
    );
    setMaxSeats((queryFilter.seats as string) || initialSeatsRange.max);
    setFilters({});
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
      <section className="flex items-center justify-between relative">
        <p className="text-lg font-semibold text-dark-1000">
          <button
            onClick={resultAmount ? onClose : undefined}
            className="hover:bg-primary-800 hover:text-white hover:border-white flex flex-row items-center px-2 py-1 border-2 rounded-3xl text-xs border-primary-1000 text-primary-1000 pl-[10px] pb-[12px] pr-[10px] pt-[12px]"
          >
            <FiltersIcon />
            <span className="ml-2">{filtersText}</span>
          </button>
          <section className="absolute left-16 -top-3">
            <div className="w-6 h-6 bg-primary-1000 rounded-full flex justify-center items-center">
              <span className="text-white font-light text-xs">
                {getCounter()}
              </span>
            </div>
          </section>
        </p>
        <section className="flex items-center">
          <button
            className="font-semibold underline capitalize text-primary-1000 text-xs"
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
