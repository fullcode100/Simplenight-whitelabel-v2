import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Checkbox from 'components/global/Checkbox/Checkbox';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import MultipleSelect, {
  Option,
} from 'components/global/MultipleSelect/MultipleSelect';

import { AMENITIES_OPTIONS } from 'hotels/constants/amenities';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import CloseIcon from 'public/icons/assets/close.svg';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);
const FilterContainer = ({ children }: { children?: any }) => (
  <section className="flex flex-col pr-6 mt-4 mb-6">{children}</section>
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
    min: '100',
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
  const starRatingLabel = t('starRating', 'Star Rating');
  const sortByLabel = t('sortBy', 'Sort By');
  const sortByPriceAsc = t('sortByPriceAsc', 'Price (Lowest First)');
  const sortByPriceDesc = t('sortByPriceDesc', 'Price (Highest First)');
  const sortByRatingAsc = t('sortByRatingAsc', 'Rating (Lowest First)');
  const sortByRatingDesc = t('sortByRatingDesc', 'Rating (Highest First)');
  const SORT_BY_OPTIONS = [
    { value: 'sortByPriceAsc', label: sortByPriceAsc },
    { value: 'sortByPriceDesc', label: sortByPriceDesc },
    { value: 'sortByStarRatingDesc', label: sortByRatingDesc },
    { value: 'sortByStarRatingAsc', label: sortByRatingAsc },
  ];

  const paymentTypesLabel = t('paymentTypes', 'Payment Type');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at Property');
  const priceRangeLabel = t('priceRange', 'Price Range');
  const clearFiltersText = t('clearFilters', 'Clear filters');
  const filtersText = t('filters', 'Filters');
  const amenitiesText = t('amenities', 'Amenities');

  const FilterTitle = ({
    label,
    className = '',
  }: {
    label: string;
    className?: string;
  }) => <label className={`mb-2 ${className}`}>{label}</label>;

  const handleClearFilters = () => {
    setKeywordSearch('');
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setMinStarRating('1');
    setMaxStarRating('5');
    setFreeCancellation(false);
    setPayAtProperty(false);
    setSortBy('sortByPriceAsc');
    setSelectedAmenities([]);
  };

  const onChangeMinPrice = (value: string) => {
    setMinPrice(value);
    setQueryParams({
      minPrice: value,
    });
  };

  const onChangeMaxPrice = (value: string) => {
    setMaxPrice(value);
    setQueryParams({
      maxPrice: value,
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

  const onChangePayAtProperty = (value: boolean) => {
    const paymentTypes = [];
    if (value) paymentTypes.push('payAtProperty');
    if (freeCancellation) paymentTypes.push('freeCancellation');
    setPayAtProperty(value);
    setQueryParams({
      paymentTypes: paymentTypes.join('-'),
    });
  };

  const KeywordSearchFilter = () => (
    <FilterContainer>
      <FilterTitle label={keywordSearchLabel} />
      <IconInput
        value={keywordSearch}
        placeholder={searchKeywordPlaceholder}
        icon={<SearchIcon className="text-dark-700" />}
        onChange={(e) => setKeywordSearch(e.target.value)}
      />
    </FilterContainer>
  );

  const StarRatingFilter = () => (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <RangeSlider
        initialMin={minStarRating ? parseInt(minStarRating) : 1}
        initialMax={maxStarRating ? parseInt(maxStarRating) : 5}
        min={1}
        max={5}
        step={1}
        minDifference={0}
        type="star"
        setMinState={onChangeMinRating}
        setMaxState={onChangeMaxRating}
      />
    </FilterContainer>
  );

  const PriceRangeFilter = () => (
    <FilterContainer>
      <FilterTitle label={priceRangeLabel} />
      <RangeSlider
        initialMin={minPrice ? parseInt(minPrice) : 100}
        initialMax={maxPrice ? parseInt(maxPrice) : 5000}
        min={100}
        max={5000}
        step={100}
        minDifference={100}
        type="price"
        setMinState={onChangeMinPrice}
        setMaxState={onChangeMaxPrice}
      />
    </FilterContainer>
  );

  const LabelFilter = () => (
    <FilterContainer>
      <FilterTitle label={paymentTypesLabel} />
      <Checkbox
        checked={freeCancellation}
        name={'freeCancellation'}
        className="mb-4"
        onChange={onChangeFreeCancellation}
      >
        {freeCancellationLabel}
      </Checkbox>
      <Checkbox
        checked={payAtProperty}
        name={'payAtProperty'}
        className="mb-4"
        onChange={onChangePayAtProperty}
      >
        {payAtPropertyLabel}
      </Checkbox>
    </FilterContainer>
  );
  const SortByFilter = () => (
    <FilterContainer>
      <FilterTitle label={sortByLabel} className="mb-3" />
      <RadioGroup onChange={onChangeSortBy} value={sortBy}>
        {SORT_BY_OPTIONS.map((option, i) => (
          <Radio key={i} value={option?.value} containerClass="mb-4">
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </FilterContainer>
  );

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

  const handleDeleteAmenitie = (value: Option) => {
    const amenities = selectedAmenities.filter((amenity) => amenity !== value);
    setSelectedAmenities(amenities);
    onChangeAmenitiesParams(amenities);
  };

  const AmenitiesFilter = () => (
    <FilterContainer>
      <FilterTitle label={amenitiesText} />
      <MultipleSelect
        options={AMENITIES_OPTIONS}
        values={selectedAmenities}
        onChange={onChangeAmenities}
        translation="hotels"
      />
      <section className="flex flex-wrap gap-3 mt-6">
        {selectedAmenities.map((amenity) => (
          <section
            key={amenity.value}
            className="flex items-center gap-2 px-2 py-1 border rounded-md bg-dark-100 border-dark-200"
          >
            {t(amenity.label)}
            <button
              className="text-base text-dark-1000"
              onClick={() => handleDeleteAmenitie(amenity)}
            >
              <CloseIcon className="text-dark-800" />
            </button>
          </section>
        ))}
      </section>
    </FilterContainer>
  );

  return (
    <section className="h-full py-4 overflow-y-scroll">
      <FilterHeader />
      {/* <KeywordSearchFilter /> */}
      <PriceRangeFilter />
      <Divider className="my-4 opacity-0" />
      <SortByFilter />
      <Divider className="my-6" />
      <StarRatingFilter />
      <Divider className="my-6" />
      <LabelFilter />
      <Divider className="my-6" />
      <AmenitiesFilter />
    </section>
  );
};

export default HotelFilterFormDesktop;
