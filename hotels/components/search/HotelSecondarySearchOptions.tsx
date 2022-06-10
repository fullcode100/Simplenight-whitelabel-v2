import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Checkbox from 'hotels/components/search/Checkbox/Checkbox';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import Radio from 'components/global/Radio/Radio';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const HotelSecondarySearchOptions = () => {
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [checkedLabels, setCheckedLabels] = useState<any[]>([]);
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

  const [paymentTypes, setPaymentTypes] = useState<string>('');
  let minStarRating: number;
  let maxStarRating: number;
  let starRating = queryFilter?.starRating as string;
  let minPrice = queryFilter?.minPrice as string;
  let maxPrice = queryFilter?.maxPrice as string;

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
  let starRating = queryFilter?.starRating as string;

  const [t, i18n] = useTranslation('hotels');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
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
  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');
  const priceRangeLabel = t('priceRange', 'Price Range');
  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleClearFilters = () => {
    setMinPrice(initialPriceRange.min);
    setMaxPrice(initialPriceRange.max);
    setMinStarRating('1');
    setMaxStarRating('5');
    setFreeCancellation(false);
    setPayAtProperty(false);
    setSortBy('sortByPriceAsc');
  };

  const setStarRatingFilter = () => {
    starRating = `${minStarRating ?? 1},${maxStarRating ?? 5}`;
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
    setStarRatingFilter();
    setQueryParams({
      ...queryFilter,
      keywordSearch,
      sortBy,
      paymentTypes,
      ...(starRating && { starRating }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    });
  };

  useEffect(() => {
    const paymentTypes = [];
    if (freeCancellation) {
      paymentTypes.push('freeCancellation');
    }
    setPaymentTypes(paymentTypes.join('-'));
  }, [freeCancellation, payAtProperty]);

  const FilterTitle = ({
    label,
    className = '',
  }: {
    label: string;
    className?: string;
  }) => <label className={`mb-2 ${className}`}>{label}</label>;

  const FilterContainer = ({ children }: { children?: any }) => (
    <section className="px-4 mt-4 mb-6 flex flex-col">{children}</section>
  );

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
        setMinState={setMinStarRating}
        setMaxState={setMaxStarRating}
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
        setMinState={setMinPrice}
        setMaxState={setMaxPrice}
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
        className="mb-5"
        onChange={setFreeCancellation}
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
          onChange={setSortBy}
        />
      ))}
    </FilterContainer>
  );

  const FilterForm = () => (
    <section className="py-4 h-full overflow-y-scroll">
      {/* <KeywordSearchFilter /> */}
      <PriceRangeFilter />
      <SortByFilter />
      <Divider className="my-6" />
      <StarRatingFilter />
      <Divider className="my-6" />
      <LabelFilter />
    </section>
  );

  const ClearFilterButton = () => (
    <button
      className="text-base text-primary-1000 font-semibold underline"
      onClick={handleClearFilters}
    >
      {clearFiltersText}
    </button>
  );

  const Modals = () => (
    <>
      <FullScreenModal
        open={isFilterModalOpen}
        closeModal={() => setFilterModalOpen(false)}
        title={filtersLabel}
        primaryButtonText={applyFiltersLabel}
        primaryButtonAction={() => handleDispatchFilters()}
        headerAction={<ClearFilterButton />}
      >
        <FilterForm />
      </FullScreenModal>
    </>
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
    <section className="px-4 w-full flex gap-2 py-3">
      <Button
        value={filtersLabel}
        size="full-sm"
        leftIcon={<FilterIcon />}
        onClick={handleFilterButtonClick}
        translationKey="filters"
        context="hotels"
      />
      <Button
        value={viewButtonValue}
        size="full-sm"
        type="outlined"
        leftIcon={icon}
        onClick={handleChangeResultView}
      />
      <Modals />
    </section>
  );
};

export default HotelSecondarySearchOptions;
