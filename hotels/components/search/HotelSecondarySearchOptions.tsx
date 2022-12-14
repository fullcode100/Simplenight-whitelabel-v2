import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import PaymentFilter from './Filters/PaymentFilter';
import StarRatingFilter from './Filters/StarRatingFilter';
import SortByFilter from './Filters/SortByFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import PropertyFilter from './Filters/PropertyFilter';

import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import { availableFilters } from './HotelResultsDisplay';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);
const initialPriceRange = {
  min: 0,
  max: 5000,
};
const FREE_CANCELATION_INITIAL_VALUE = false;
const MIN_STAR_RATING_INITIAL_VALUE = 1;
const MAX_STAR_RATING_INITIAL_VALUE = 5;
const SORT_BY_INITIAL_VALUE = 'sortByPriceAsc';
const HOTELS_INITIAL_VALUE = false;
const VACATION_RENTALS_INITIAL_VALUE = false;

interface HotelSecondarySearchOptionsProps {
  handleFilterHotels: (
    filterToApply: availableFilters,
    valueToFilter?: string | boolean,
  ) => void;
  loading: boolean;
}

const HotelSecondarySearchOptions = ({
  handleFilterHotels,
  loading,
}: HotelSecondarySearchOptionsProps) => {
  const setQueryParams = useQuerySetter();
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>(SORT_BY_INITIAL_VALUE);
  const [freeCancellation, setFreeCancellation] = useState<boolean>(
    FREE_CANCELATION_INITIAL_VALUE,
  );
  const [propertyHotels, setPropertyHotels] =
    useState<boolean>(HOTELS_INITIAL_VALUE);
  const [vacationRentals, setVacationRentals] = useState<boolean>(
    VACATION_RENTALS_INITIAL_VALUE,
  );
  const [minPrice, setMinPrice] = useState<number>(initialPriceRange.min);
  const [maxPrice, setMaxPrice] = useState<number>(initialPriceRange.max);
  const [minStarRating, setMinStarRating] = useState<number>(
    MIN_STAR_RATING_INITIAL_VALUE,
  );
  const [maxStarRating, setMaxStarRating] = useState<number>(
    MAX_STAR_RATING_INITIAL_VALUE,
  );

  const [t] = useTranslation('hotels');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');
  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleClearFilters = () => {
    handleFilterHotels('showAll');
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setFreeCancellation(FREE_CANCELATION_INITIAL_VALUE);
    setMinStarRating(MIN_STAR_RATING_INITIAL_VALUE);
    setMaxStarRating(MAX_STAR_RATING_INITIAL_VALUE);
    setSortBy(SORT_BY_INITIAL_VALUE);
    setPropertyHotels(HOTELS_INITIAL_VALUE);
    setVacationRentals(VACATION_RENTALS_INITIAL_VALUE);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
  };

  const onChangeMinPrice = (value: string) => {
    handleFilterHotels('minPrice', value);
  };

  const onChangeMaxPrice = (value: string) => {
    handleFilterHotels('maxPrice', value);
  };

  const onChangeMinRating = (value: string) => {
    handleFilterHotels('minRating', value);
  };

  const onChangeMaxRating = (value: string) => {
    handleFilterHotels('maxRating', value);
  };

  const specialCasesProperties = (propertyOptions: string[]) => {
    if (propertyOptions.length === 2) {
      handleFilterHotels('propertyHotel&Rental');
    }
    if (propertyOptions.length === 0) {
      handleFilterHotels('propertyAll');
    }
  };

  const onChangeHotels = (value: boolean) => {
    const propertyTypes = [];
    if (value) {
      propertyTypes.push('hotels');
      handleFilterHotels('propertyHotel');
    }
    if (vacationRentals) {
      propertyTypes.push('vacationRentals');
      handleFilterHotels('propertyRental');
    }
    setPropertyHotels(value);
    specialCasesProperties(propertyTypes);
  };

  const onChangeVacationRentals = (value: boolean) => {
    const propertyTypes = [];
    if (value) {
      propertyTypes.push('vacationRentals');
      handleFilterHotels('propertyRental');
    }
    if (propertyHotels) {
      propertyTypes.push('hotels');
      handleFilterHotels('propertyHotel');
    }
    setVacationRentals(value);
    specialCasesProperties(propertyTypes);
  };

  const FilterForm = (
    <section
      className="overflow-y-auto px-5 py-4"
      style={{ maxHeight: '75vh' }}
    >
      {/* <KeywordSearchFilter /> */}
      <PropertyFilter
        hotels={propertyHotels}
        vacationRentals={vacationRentals}
        onChangeHotels={onChangeHotels}
        onChangeVacationRentals={onChangeVacationRentals}
      />
      <Divider className="my-6" />
      <PriceRangeFilter
        onChangeMinPrice={onChangeMinPrice}
        onChangeMaxPrice={onChangeMaxPrice}
        setMinValue={setMinPrice}
        setMaxValue={setMaxPrice}
        minValue={minPrice}
        maxValue={maxPrice}
      />
      <SortByFilter sortBy={sortBy} onChangeSortBy={setSortBy} />
      <Divider className="my-6" />
      <StarRatingFilter
        onChangeMinRating={onChangeMinRating}
        onChangeMaxRating={onChangeMaxRating}
        setMinValue={setMinStarRating}
        setMaxValue={setMaxStarRating}
        minValue={minStarRating}
        maxValue={maxStarRating}
      />
      <Divider className="my-6" />
      <PaymentFilter
        freeCancellation={freeCancellation}
        onChangeFreeCancellation={setFreeCancellation}
      />
      <Divider className="my-6" />
      {/* <AmenitiesFilter
        selectedAmenities={selectedAmenities}
        onChangeAmenities={onChangeAmenities}
        handleDeleteAmenity={handleDeleteAmenity}
      /> */}
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
    <section className=" flex w-full gap-2 px-4 py-3">
      <Button
        value={filtersLabel}
        size="full-sm"
        leftIcon={<FilterIcon />}
        onClick={handleFilterButtonClick}
        translationKey="filters"
        context="hotels"
        disabled={loading}
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

export default HotelSecondarySearchOptions;
