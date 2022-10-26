import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import AmenitiesFilter from './Filters/AmenitiesFilter';
import PaymentFilter from './Filters/PaymentFilter';
import StarRatingFilter from './Filters/StarRatingFilter';
import SortByFilter from './Filters/SortByFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import FilterContainer from './Filters/FilterContainer';
import PropertyFilter from './Filters/PropertyFilter';

import { AMENITIES_OPTIONS } from 'hotels/constants/amenities';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import SearchIcon from 'public/icons/assets/magnifier.svg';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const HotelFilterFormDesktop = () => {
  const router = useRouter();
  const setQueryParams = useQuerySetter();
  const [queryFilter, setQueryFilters] = useState(router.query);

  const [keywordSearch, setKeywordSearch] = useState<string>(
    (queryFilter?.keywordSearch as string) || '',
  );
  const [sortBy, setSortBy] = useState<string>(
    (queryFilter?.sortBy as string) || 'sortByPriceAsc',
  );

  const [freeCancellation, setFreeCancellation] = useState<boolean>(
    queryFilter?.paymentTypes?.includes('freeCancellation') || false,
  );

  const [hotels, setHotels] = useState<boolean>(
    queryFilter?.propertyTypes?.includes('hotels') || false,
  );

  const [vacationRentals, setVacationRentals] = useState<boolean>(
    queryFilter?.propertyTypes?.includes('vacationRentals') || false,
  );

  const [payAtProperty, setPayAtProperty] = useState<boolean>(
    queryFilter?.paymentTypes?.includes('payAtProperty') || false,
  );

  const getAmenities = () => {
    const amenitiesListParams =
      queryFilter?.amenities?.toString().split(',') || [];

    return AMENITIES_OPTIONS.filter((amenity) =>
      amenitiesListParams.includes(amenity.value),
    );
  };

  const [selectedAmenities, setSelectedAmenities] = useState<Option[]>(
    getAmenities(),
  );

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
  const [minStarRating, setMinStarRating] = useState<string>(
    (queryFilter.starRating && queryFilter?.starRating[0]) || '1',
  );
  const [maxStarRating, setMaxStarRating] = useState<string>(
    (queryFilter.starRating && queryFilter?.starRating[2]) || '5',
  );
  // let starRating = queryFilter?.starRating as string;
  const [t, i18n] = useTranslation('hotels');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t(
    'searchKeywordPlaceholder',
    'Venue Name, Landmark, Location, etc.',
  );

  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');

  const handleClearFilters = () => {
    setQueryParams({
      propertyTypes: '',
      paymentTypes: '',
      amenities: '',
      starRating: '',
      priceRange: '',
      sortBy: '',
      isTotalPrice: '',
      minPrice: '',
      maxPrice: '',
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

  const onChangeSortBy = (value: string) => {
    setSortBy(value);
    setQueryParams({
      sortBy: value,
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

  const onChangeFreeCancellation = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('freeCancellation');
    if (payAtProperty) paymentTypes.push('payAtProperty');
    setFreeCancellation(value);
    setQueryParams({
      paymentTypes: paymentTypes.join('-'),
    });
  };

  const onChangeHotels = (value: boolean) => {
    const propertyTypes = [];
    if (value) propertyTypes.push('hotels');
    if (vacationRentals) propertyTypes.push('vacationRentals');
    setHotels(value);
    setQueryParams({
      propertyTypes: propertyTypes.join(','),
    });
  };

  const onChangeVacationRentals = (value: boolean) => {
    const propertyTypes = [];
    if (value) propertyTypes.push('vacationRentals');
    if (hotels) propertyTypes.push('hotels');
    setVacationRentals(value);
    setQueryParams({
      propertyTypes: propertyTypes.join(','),
    });
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
          className="text-base font-semibold capitalize text-primary-1000"
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
    <section className="h-full py-4 overflow-y-scroll">
      <FilterHeader />
      {/* <KeywordSearchFilter /> */}
      <PropertyFilter
        hotels={hotels}
        vacationRentals={vacationRentals}
        onChangeHotels={onChangeHotels}
        onChangeVacationRentals={onChangeVacationRentals}
      />
      <Divider className="my-6" />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMinPrice={onChangeMinPrice}
        onChangeMaxPrice={onChangeMaxPrice}
      />
      <Divider className="my-4 opacity-0" />
      <SortByFilter sortBy={sortBy} onChangeSortBy={onChangeSortBy} />
      <Divider className="my-6" />
      <StarRatingFilter
        minStarRating={minStarRating}
        maxStarRating={maxStarRating}
        onChangeMinRating={onChangeMinRating}
        onChangeMaxRating={onChangeMaxRating}
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
