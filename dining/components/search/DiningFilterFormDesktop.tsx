import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import StarRatingFilter from './filters/StarRatingFilter';
import FilterContainer from './filters/FilterContainer';
import PriceRangeFilter from './filters/PriceRangeFilter';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import SortByFilter from './filters/SortByFilter';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

function DiningFilterFormDesktop() {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const [queryFilter, setQueryFilters] = useState(router.query);

  const [sortBy, setSortBy] = useState<string>(
    (queryFilter?.sortBy as string) || 'sortByPriceAsc',
  );

  const initialPriceRange = {
    min: '1',
    max: '4',
  };
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.price && queryFilter?.price[0]) || '1',
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter?.price && queryFilter?.price[2]) || '4',
  );
  const [minStarRating, setMinStarRating] = useState<string>(
    (queryFilter.starRating && queryFilter?.starRating[0]) || '1',
  );
  const [maxStarRating, setMaxStarRating] = useState<string>(
    (queryFilter.starRating && queryFilter?.starRating[2]) || '5',
  );

  const [t, i18n] = useTranslation('hotels');

  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');

  const handleClearFilters = () => {
    setQueryParams({
      price: '',
      starRating: '',
    });
  };

  const onChangeMinPrice = (value: string) => {
    const queryValue = `${value ?? 1},${maxPrice ?? 5}`;
    setMinPrice(value);
    setQueryParams({
      price: queryValue,
    });
  };

  const onChangeMaxPrice = (value: string) => {
    const queryValue = `${minPrice ?? 1},${value ?? 5}`;
    setMaxPrice(value);
    setQueryParams({
      price: queryValue,
    });
  };

  const onChangeMinRating = (value: string) => {
    const rating = `${value ?? 1},${maxStarRating ?? 5}`;
    setMinStarRating(value);
    setQueryParams({
      starRating: rating,
    });
  };

  const onChangeMaxRating = (value: string) => {
    const rating = `${minStarRating ?? 1},${value ?? 5}`;
    setMaxStarRating(value);
    setQueryParams({
      starRating: rating,
    });
  };

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
    setQueryParams({
      sortBy: value,
    });
  };

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="text-base font-semibold capitalize text-primary-1000"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );
  return (
    <section className="h-full py-4 overflow-y-scroll">
      <section className="pr-4">
        <FilterHeader />
        <Divider className="my-6" />
        {/* <SortByFilter
          recommended={true}
          openNow={false}
          offeringDiscounts={false}
          onChangeHotels={() => true}
          onChangeVacationRentals={() => true}
        /> */}
        <PriceRangeFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChangeMinPrice={onChangeMinPrice}
          onChangeMaxPrice={onChangeMaxPrice}
        />
        <Divider className="my-4 opacity-0" />
        <StarRatingFilter
          minStarRating={minStarRating}
          maxStarRating={maxStarRating}
          onChangeMinRating={onChangeMinRating}
          onChangeMaxRating={onChangeMaxRating}
        />
      </section>
    </section>
  );
}

export default DiningFilterFormDesktop;
