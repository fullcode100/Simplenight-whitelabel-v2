import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import PriceRangeFilter from './filters/PriceRangeFilter';
import SortByFilter from './filters/SortByFilter';
import StarRatingFilter from './filters/StarRatingFilter';

import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import FilterIcon from 'public/icons/assets/filter.svg';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const DiningSecondarySearchOptions = () => {
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<string>('');

  const [sortBy, setSortBy] = useState<string>(
    (queryFilter?.sortBy as string) || 'sortByPriceAsc',
  );

  const initialPriceRange = {
    min: '1',
    max: '4',
  };
  const [minPrice, setMinPrice] = useState<string>(
    (queryFilter?.price && queryFilter?.price[0]) || initialPriceRange.min,
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    (queryFilter.price && queryFilter?.price[2]) || initialPriceRange.max,
  );
  const [minStarRating, setMinStarRating] = useState<string>(
    (queryFilter.starRating && queryFilter?.starRating[0]) || '1',
  );
  const [maxStarRating, setMaxStarRating] = useState<string>(
    (queryFilter.starRating && queryFilter?.starRating[2]) || '5',
  );

  let starRating = queryFilter?.starRating as string;

  const [t, i18n] = useTranslation('dining');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');
  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleClearFilters = () => {
    setQueryParams({
      price: '',
      starRating: '',
    });
  };

  const setStarRatingFilter = () => {
    starRating = `${minStarRating ?? 1},${maxStarRating ?? 5}`;
  };

  const onChangeMinPrice = (value: string) => {
    const queryValue = `${value ?? 1},${maxPrice ?? 5}`;
    setPriceRange(queryValue);
  };

  const onChangeMaxPrice = (value: string) => {
    const queryValue = `${minPrice ?? 1},${value ?? 5}`;
    setPriceRange(queryValue);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
    setStarRatingFilter();
    setQueryParams({
      price: priceRange,
    });
  };

  const FilterForm = (
    <section
      className="px-5 py-4 overflow-y-auto"
      style={{ maxHeight: '75vh' }}
    >
      {/* <SortByFilter
        recommended={true}
        openNow={false}
        offeringDiscounts={false}
        onChangeHotels={() => true}
        onChangeVacationRentals={() => true}
      /> */}
      <Divider className="my-6" />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMinPrice={onChangeMinPrice}
        onChangeMaxPrice={onChangeMaxPrice}
      />
      <Divider className="my-6" />
      <StarRatingFilter
        minStarRating={minStarRating}
        maxStarRating={maxStarRating}
        onChangeMinRating={setMinStarRating}
        onChangeMaxRating={setMaxStarRating}
      />
      <Divider className="my-6" />
    </section>
  );

  const ClearFilterButton = () => (
    <button
      className="text-base font-semibold underline text-primary-1000"
      onClick={handleClearFilters}
    >
      {clearFiltersText}
    </button>
  );

  const Modals = (
    <div className="relative">
      <FullScreenModal
        open={isFilterModalOpen}
        closeModal={() => setFilterModalOpen(false)}
        title={filtersLabel}
        primaryButtonText={applyFiltersLabel}
        primaryButtonAction={() => handleDispatchFilters()}
        headerAction={<ClearFilterButton />}
      >
        {FilterForm}
      </FullScreenModal>
    </div>
  );

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';
  const viewParam = isListView ? 'map' : 'list';
  const icon = isListView ? <MapIcon /> : <ListIcon />;
  const viewButtonValue = isListView ? textMapView : textListView;

  const handleChangeResultView = () => {
    setQueryParams({
      view: viewParam,
    });
  };

  return (
    <section className="flex w-full gap-2 px-4 py-3 lg:hidden">
      <Button
        value={filtersLabel}
        size="full-sm"
        leftIcon={<FilterIcon />}
        onClick={handleFilterButtonClick}
        translationKey="filters"
        context="dining"
      />
      <Button
        value={viewButtonValue}
        size="full-sm"
        type="outlined"
        leftIcon={icon}
        onClick={handleChangeResultView}
      />
      {Modals}
    </section>
  );
};

export default DiningSecondarySearchOptions;
