import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from 'hotels/components/search/Checkbox/Checkbox';

import IconInput from 'components/global/Input/IconInput';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import Radio from 'components/global/Radio/Radio';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import MultipleSelect from 'components/global/MultipleSelect/MultipleSelect';
import CloseIcon from 'public/icons/assets/close.svg';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

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
  const [payAtProperty, setPayAtProperty] = useState<boolean>(
    queryFilter?.paymentTypes?.includes('payAtProperty') || false,
  );

  const [selectedAmenities, setSelectedAmenities] = useState([]);

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
  };

  const FilterContainer = ({ children }: { children?: any }) => (
    <section className="pr-6 mt-4 mb-6 flex flex-col">{children}</section>
  );

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
        value={'freeCancellation'}
        state={freeCancellation}
        label={freeCancellationLabel}
        name={'paymentTypes'}
        className="mb-4"
        onChange={onChangeFreeCancellation}
      />
      <Checkbox
        value={'payAtProperty'}
        state={payAtProperty}
        label={payAtPropertyLabel}
        name={'paymentTypes'}
        className="mb-4"
        onChange={onChangePayAtProperty}
      />
    </FilterContainer>
  );

  const SortByFilter = () => (
    <FilterContainer>
      <FilterTitle label={sortByLabel} className="mb-3" />
      {SORT_BY_OPTIONS.map((option, i) => (
        <Radio
          key={i}
          value={option.value}
          state={sortBy}
          label={option.label}
          name="sortBy"
          className="mb-4"
          onChange={onChangeSortBy}
        />
      ))}
    </FilterContainer>
  );

  const FilterHeader = () => (
    <FilterContainer>
      <section className="flex justify-between items-center">
        <p className="text-lg font-semibold text-dark-1000">{filtersText}</p>
        <button
          className="font-semibold text-base text-primary-1000 capitalize"
          onClick={handleClearFilters}
        >
          {clearFiltersText}
        </button>
      </section>
    </FilterContainer>
  );

  const onChangeAmenities = (value: string) => {
    let stateOptions = [...selectedAmenities];
    const index = stateOptions.indexOf(value as never);
    if (index > -1) stateOptions.splice(index, 1);
    else stateOptions = [...stateOptions, value as never];
    setSelectedAmenities(stateOptions);
  };

  const handleDeleteAmenitie = (value: string) => {
    const amenities = selectedAmenities.filter(
      (amenitie) => amenitie !== value,
    );
    setSelectedAmenities(amenities);
  };

  const AmenitiesFilter = () => (
    <FilterContainer>
      <FilterTitle label={amenitiesText} />
      <MultipleSelect
        options={['Bar', 'Dining', 'Pool', 'Parking', 'Casino']}
        values={selectedAmenities}
        onChange={onChangeAmenities}
      />
      <section className="flex gap-3 mt-6 flex-wrap">
        {selectedAmenities.map((amenitie) => (
          <section
            key={amenitie}
            className="bg-dark-100 rounded-md py-1 px-2 border border-dark-200 flex gap-2 items-center"
          >
            {amenitie}
            <button
              className="text-base text-dark-1000"
              onClick={() => handleDeleteAmenitie(amenitie)}
            >
              <CloseIcon className="text-dark-800" />
            </button>
          </section>
        ))}
      </section>
    </FilterContainer>
  );

  return (
    <section className="py-4 h-full overflow-y-scroll">
      <FilterHeader />
      {/* <KeywordSearchFilter /> */}
      <PriceRangeFilter />
      <Divider className="my-4 opacity-0" />
      <SortByFilter />
      <Divider className="my-6" />
      <StarRatingFilter />
      <Divider className="my-6" />
      <LabelFilter />
    </section>
  );
};

export default HotelFilterFormDesktop;
