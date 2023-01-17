import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import PaymentFilter from './Filters/PaymentFilter';
import StarRatingFilter from './Filters/StarRatingFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import FilterContainer from './Filters/FilterContainer';
import PropertyFilter from './Filters/PropertyFilter';

import { AMENITIES_OPTIONS } from 'hotels/constants/amenities';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import NameFilter from './Filters/NameFilter';
import { FilterCriteria } from 'hotels/hooks/useFilterHotels';
import {
  FREE_CANCELATION_INITIAL_VALUE,
  HOTELS_INITIAL_VALUE,
  initialPriceRange,
  MAX_STAR_RATING_INITIAL_VALUE,
  MIN_STAR_RATING_INITIAL_VALUE,
  VACATION_RENTALS_INITIAL_VALUE,
} from './HotelResultsDisplay';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const HOTEL_AND_RENTAL_OPTIONS_SIZE = 2;
const ALL_PROPERTY_TYPES_OPTIONS_SIZE = 0;

export interface HotelsFilterFormDesktopProps {
  handleFilterHotels: React.Dispatch<React.SetStateAction<FilterCriteria>>;
  loading: boolean;
  resetFilters: () => void;
  criteria: FilterCriteria;
  freeCancellation: boolean;
  setFreeCancellation: React.Dispatch<React.SetStateAction<boolean>>;
  vacationRentals: boolean;
  setVacationRentals: React.Dispatch<React.SetStateAction<boolean>>;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minStarRating: number;
  setMinStarRating: React.Dispatch<React.SetStateAction<number>>;
  maxStarRating: number;
  setMaxStarRating: React.Dispatch<React.SetStateAction<number>>;
}

const HotelFilterFormDesktop = ({
  handleFilterHotels,
  loading,
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
}: HotelsFilterFormDesktopProps) => {
  const setQueryParams = useQuerySetter();
  const payAtProperty = false;
  const [hotels, setHotels] = useState<boolean>(HOTELS_INITIAL_VALUE);

  const [name, setName] = useState<string>('');

  const getAmenities = () => {
    const amenitiesListParams: string | string[] = [];
    return AMENITIES_OPTIONS.filter((amenity) =>
      amenitiesListParams.includes(amenity.value),
    );
  };
  const [selectedAmenities, setSelectedAmenities] = useState<Option[]>(
    getAmenities(),
  );
  const [t] = useTranslation('hotels');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const handleClearFilters = () => {
    resetFilters();
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setFreeCancellation(FREE_CANCELATION_INITIAL_VALUE);
    setMinStarRating(MIN_STAR_RATING_INITIAL_VALUE);
    setMaxStarRating(MAX_STAR_RATING_INITIAL_VALUE);
    setHotels(HOTELS_INITIAL_VALUE);
    setVacationRentals(VACATION_RENTALS_INITIAL_VALUE);
    setName('');
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

  const onChangeHotelName = (value: string) => {
    setName(value);
    handleFilterHotels({ ...criteria, hotelName: value });
  };

  const onClearName = () => {
    setName('');
    resetFilters();
  };

  const onChangeFreeCancellation = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('freeCancellation');
    if (payAtProperty) paymentTypes.push('payAtProperty');
    setFreeCancellation(value);
    handleFilterHotels({ ...criteria, freeCancelation: value });
  };

  const specialCasesProperties = (propertyOptions: string[]) => {
    if (hasHotelAndRental(propertyOptions)) {
      handleFilterHotels({ ...criteria, property: 'propertyHotel&Rental' });
    }
    if (hasAllPropertyTypes(propertyOptions)) {
      handleFilterHotels({ ...criteria, property: 'propertyAll' });
    }
  };

  const hasHotelAndRental = (options: string[]): boolean => {
    return options.length === HOTEL_AND_RENTAL_OPTIONS_SIZE;
  };

  const hasAllPropertyTypes = (options: string[]): boolean => {
    return options.length === ALL_PROPERTY_TYPES_OPTIONS_SIZE;
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
    setHotels(value);
    specialCasesProperties(propertyTypes);
  };

  const onChangeVacationRentals = (value: boolean) => {
    const propertyTypes = [];
    if (value) {
      propertyTypes.push('vacationRentals');
      handleFilterHotels({ ...criteria, property: 'propertyRental' });
    }
    if (hotels) {
      propertyTypes.push('hotels');
      handleFilterHotels({ ...criteria, property: 'propertyHotel' });
    }
    setVacationRentals(value);
    specialCasesProperties(propertyTypes);
  };

  // Filters to add in the future

  // const onChangePayAtProperty = (value: boolean) => {
  //   const paymentTypes = [];
  //   if (value) paymentTypes.push('payAtProperty');
  //   if (freeCancellation) paymentTypes.push('freeCancellation');
  //   setPayAtProperty(value);
  //   setQueryParams({
  //     paymentTypes: paymentTypes.join('-'),
  //   });
  // };

  // const KeywordSearchFilter = () => (
  //   <FilterContainer>
  //     <FilterTitle label={keywordSearchLabel} />
  //     <IconInput
  //       value={keywordSearch}
  //       placeholder={searchKeywordPlaceholder}
  //       icon={<SearchIcon className="text-dark-700" />}
  //       onChange={(e) => setKeywordSearch(e.target.value)}
  //     />
  //   </FilterContainer>
  // );

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex items-center justify-between">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="text-base font-semibold capitalize underline text-primary-1000"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );

  const onChangeAmenitiesParams = (amenitiesList: Option[]) => {
    const amenities = amenitiesList.map((amenity) => amenity.value).join(',');

    setQueryParams({
      amenities,
    });
  };

  const onChangeAmenities = (value: Option) => {
    let stateOptions = [...selectedAmenities];
    const index = stateOptions.indexOf(value);
    if (index > -1) stateOptions.splice(index, 1);
    else stateOptions = [...stateOptions, value];
    setSelectedAmenities(stateOptions);
    onChangeAmenitiesParams(stateOptions);
  };

  const handleDeleteAmenity = (value: Option) => {
    const amenities = selectedAmenities.filter((amenity) => amenity !== value);
    setSelectedAmenities(amenities);
    onChangeAmenitiesParams(amenities);
  };

  return (
    <section
      className={`h-full py-4  ${
        loading ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <FilterHeader />
      {/* <KeywordSearchFilter /> */}
      <NameFilter
        name={name}
        onChangeHotels={onChangeHotelName}
        handleClearName={onClearName}
      />
      <Divider className="my-6" />
      <PropertyFilter
        hotels={hotels}
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
      <Divider className="my-4 opacity-0" />
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
};

export default HotelFilterFormDesktop;
