import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import PaymentFilter from './Filters/PaymentFilter';
import StarRatingFilter from './Filters/StarRatingFilter';
import SortByFilter from './Filters/SortByFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import FilterContainer from './Filters/FilterContainer';
import PropertyFilter from './Filters/PropertyFilter';

import { AMENITIES_OPTIONS } from 'hotels/constants/amenities';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import { availableFilters } from './HotelResultsDisplay';
import NameFilter from './Filters/NameFilter';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

interface HotelsFilterFormDesktopProps {
  handleFilterHotels: (
    filterToApply: availableFilters,
    valueToFilter?: string | boolean,
  ) => void;
  loading: boolean;
}

const initialPriceRange = {
  min: 0,
  max: 5000,
};

const FREE_CANCELATION_INITIAL_VALUE = false;
const MIN_STAR_RATING_INITIAL_VALUE = 1;
const MAX_STAR_RATING_INITIAL_VALUE = 5;
const HOTELS_INITIAL_VALUE = false;
const VACATION_RENTALS_INITIAL_VALUE = false;

const HotelFilterFormDesktop = ({
  handleFilterHotels,
  loading,
}: HotelsFilterFormDesktopProps) => {
  const setQueryParams = useQuerySetter();
  const payAtProperty = false;
  const [freeCancellation, setFreeCancellation] = useState<boolean>(
    FREE_CANCELATION_INITIAL_VALUE,
  );
  const [hotels, setHotels] = useState<boolean>(HOTELS_INITIAL_VALUE);
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
  // let starRating = queryFilter?.starRating as string;
  const [t] = useTranslation('hotels');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const handleClearFilters = () => {
    handleFilterHotels('showAll');
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setFreeCancellation(FREE_CANCELATION_INITIAL_VALUE);
    setMinStarRating(MIN_STAR_RATING_INITIAL_VALUE);
    setMaxStarRating(MAX_STAR_RATING_INITIAL_VALUE);
    setHotels(HOTELS_INITIAL_VALUE);
    setVacationRentals(VACATION_RENTALS_INITIAL_VALUE);
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

  const onChangeHotelName = (value: string) => {
    setName(value);
    handleFilterHotels('hotelName', value);
  };

  const onChangeFreeCancellation = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('freeCancellation');
    if (payAtProperty) paymentTypes.push('payAtProperty');
    setFreeCancellation(value);
    handleFilterHotels('freeCancelation', value);
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
    setHotels(value);
    specialCasesProperties(propertyTypes);
  };

  const onChangeVacationRentals = (value: boolean) => {
    const propertyTypes = [];
    if (value) {
      propertyTypes.push('vacationRentals');
      handleFilterHotels('propertyRental');
    }
    if (hotels) {
      propertyTypes.push('hotels');
      handleFilterHotels('propertyHotel');
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
      className={`h-full py-4 overflow-y-scroll ${
        loading ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <FilterHeader />
      {/* <KeywordSearchFilter /> */}
      <NameFilter name={name} onChangeHotels={onChangeHotelName} />
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
