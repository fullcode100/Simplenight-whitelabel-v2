import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import PaymentFilter from './Filters/PaymentFilter';
import StarRatingFilter from './Filters/StarRatingFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import PropertyFilter from './Filters/PropertyFilter';

import {
  FREE_CANCELATION_INITIAL_VALUE,
  HOTELS_INITIAL_VALUE,
  initialPriceRange,
  MAX_STAR_RATING_INITIAL_VALUE,
  MIN_STAR_RATING_INITIAL_VALUE,
  VACATION_RENTALS_INITIAL_VALUE,
} from './HotelResultsDisplay';
import { HotelsFilterFormDesktopProps } from './HotelFilterFormDesktop';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface HotelSecondarySearchOptionsProps
  extends Omit<HotelsFilterFormDesktopProps, 'loading'> {
  isFilterModalOpen: boolean;
  setFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HotelMobileFilters = ({
  handleFilterHotels,
  setFilterModalOpen,
  isFilterModalOpen,
  resetFilters,
  criteria,
  freeCancellation,
  setFreeCancellation,
  vacationRentals,
  setVacationRentals,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minStarRating,
  setMinStarRating,
  maxStarRating,
  setMaxStarRating,
}: HotelSecondarySearchOptionsProps) => {
  const payAtProperty = false;
  const [propertyHotels, setPropertyHotels] =
    useState<boolean>(HOTELS_INITIAL_VALUE);
  const [t] = useTranslation('hotels');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');

  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleClearFilters = () => {
    resetFilters();
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setFreeCancellation(FREE_CANCELATION_INITIAL_VALUE);
    setMinStarRating(MIN_STAR_RATING_INITIAL_VALUE);
    setMaxStarRating(MAX_STAR_RATING_INITIAL_VALUE);
    setPropertyHotels(HOTELS_INITIAL_VALUE);
    setVacationRentals(VACATION_RENTALS_INITIAL_VALUE);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
  };

  const onChangeMinPrice = (value: string) => {
    handleFilterHotels({ ...criteria, MinPrice: value });
  };

  const onChangeMaxPrice = (value: string) => {
    handleFilterHotels({ ...criteria, MaxPrice: value });
  };

  const onChangeMinRating = (value: string) => {
    handleFilterHotels({ ...criteria, MinRange: value });
  };

  const onChangeMaxRating = (value: string) => {
    handleFilterHotels({ ...criteria, MaxRange: value });
  };

  const specialCasesProperties = (propertyOptions: string[]) => {
    if (propertyOptions.length === 2) {
      handleFilterHotels({ ...criteria, property: 'propertyHotel&Rental' });
    }
    if (propertyOptions.length === 0) {
      handleFilterHotels({ ...criteria, property: 'propertyAll' });
    }
  };

  const onChangeFreeCancellation = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('freeCancellation');
    if (payAtProperty) paymentTypes.push('payAtProperty');
    setFreeCancellation(value);
    handleFilterHotels({ ...criteria, freeCancelation: value });
  };

  const onChangeHotels = (value: boolean) => {
    const propertyTypes = [];
    if (value) {
      propertyTypes.push('hotels');
      handleFilterHotels({ ...criteria, property: 'propertyHotel' });
    }
    if (vacationRentals) {
      propertyTypes.push('vacationRentals');
      handleFilterHotels({ ...criteria, property: 'propertyRental' });
    }
    setPropertyHotels(value);
    specialCasesProperties(propertyTypes);
  };

  const onChangeVacationRentals = (value: boolean) => {
    const propertyTypes = [];
    if (value) {
      propertyTypes.push('vacationRentals');
      handleFilterHotels({ ...criteria, property: 'propertyRental' });
    }
    if (propertyHotels) {
      propertyTypes.push('hotels');
      handleFilterHotels({ ...criteria, property: 'propertyHotel' });
    }
    setVacationRentals(value);
    specialCasesProperties(propertyTypes);
  };

  const FilterForm = (
    <section className="h-full overflow-y-auto px-5 py-4">
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
        onChangeFreeCancellation={onChangeFreeCancellation}
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

  return <section className=" flex w-full gap-2 px-4 py-3">{Modals}</section>;
};

export default HotelMobileFilters;
