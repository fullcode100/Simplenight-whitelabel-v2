import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Rating from 'components/global/Rating/Rating';
import Checkbox from 'hotels/components/search/Checkbox/Checkbox';
import Select from 'components/global/Select/Select';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import { useRouter } from 'next/router';
import Radio from 'components/global/Radio/Radio';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const INITIAL_RATING_VALUE = 3;

const HotelSecondarySearchOptions = () => {
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(INITIAL_RATING_VALUE);
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
    { value: 'sortByRatingDesc', label: sortByRatingDesc },
    { value: 'sortByRatingAsc', label: sortByRatingAsc },
  ];

  const paymentTypesLabel = t('paymentTypes', 'Payment Type');
  const freeCancellationLabel = t('freeCancellation', 'Free Cancellation');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at Property');
  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleRatingFilterChange = (newRating: number) => {
    setRatingValue(newRating);
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
    setQueryParams({
      ...queryFilter,
      keywordSearch,
      sortBy,
      paymentTypes,
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

  const RatingFilter = () => (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <Rating
        value={ratingValue}
        onChange={handleRatingFilterChange}
        editable
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
    <section className="py-4 h-full">
      <KeywordSearchFilter />
      <SortByFilter />
      <Divider className="my-6" />
      <RatingFilter />
      <Divider className="my-6" />
      <LabelFilter />
    </section>
  );

  const Modals = () => (
    <>
      <FullScreenModal
        open={isFilterModalOpen}
        closeModal={() => setFilterModalOpen(false)}
        title={filtersLabel}
        primaryButtonText={applyFiltersLabel}
        primaryButtonAction={() => handleDispatchFilters()}
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
