import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { Option } from 'components/global/MultipleSelect/MultipleSelect';
import AmenitiesFilter from './Filters/AmenitiesFilter';
import PaymentFilter from './Filters/PaymentFilter';
import StarRatingFilter from './Filters/StarRatingFilter';
import SortByFilter from './Filters/SortByFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import PropertyFilter from './Filters/PropertyFilter';

import { AMENITIES_OPTIONS } from 'hotels/constants/amenities';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';

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

  const [hotels, setHotels] = useState<boolean>(
    queryFilter?.propertyTypes?.includes('hotels') || false,
  );

  const [vacationRentals, setVacationRentals] = useState<boolean>(
    queryFilter?.propertyTypes?.includes('vacationRentals') || false,
  );

  const [payAtProperty, setPayAtProperty] = useState<boolean>(
    queryFilter?.paymentTypes?.includes('payAtProperty') || false,
  );

  const [paymentTypes, setPaymentTypes] = useState<string>('');

  const [propertyTypes, setPropertyTypes] = useState<string>('');

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

  let starRating = queryFilter?.starRating as string;

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

  const [t, i18n] = useTranslation('hotels');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t(
    'searchKeywordPlaceholder',
    'Venue Name, Landmark, Location, etc.',
  );

  const textMapView = t('mapView', 'Map View');
  const textListView = t('listView', 'List View');
  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

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

  const setStarRatingFilter = () => {
    starRating = `${minStarRating ?? 1},${maxStarRating ?? 5}`;
  };

  const handleDispatchFilters = () => {
    const amenities = selectedAmenities
      .map((amenity) => amenity.value)
      .join(',');

    setFilterModalOpen(false);
    setStarRatingFilter();
    setQueryParams({
      ...queryFilter,
      keywordSearch,
      sortBy,
      paymentTypes,
      propertyTypes,
      ...(starRating && { starRating }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
      amenities,
    });
  };

  useEffect(() => {
    const paymentTypes = [];
    if (freeCancellation) {
      paymentTypes.push('freeCancellation');
    }
    setPaymentTypes(paymentTypes.join('-'));
  }, [freeCancellation, payAtProperty]);

  useEffect(() => {
    const propertyTypes = [];
    if (hotels) {
      propertyTypes.push('hotels');
    }
    if (vacationRentals) {
      propertyTypes.push('vacationRentals');
    }
    setPropertyTypes(propertyTypes.join(','));
  }, [hotels, vacationRentals]);

  // Filters to add in the future

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

  const onChangeAmenities = (value: Option) => {
    let stateOptions = [...selectedAmenities];
    const index = stateOptions.indexOf(value);
    if (index > -1) stateOptions.splice(index, 1);
    else stateOptions = [...stateOptions, value];
    setSelectedAmenities(stateOptions);
  };

  const handleDeleteAmenity = (value: Option) => {
    const amenities = selectedAmenities.filter((amenity) => amenity !== value);
    setSelectedAmenities(amenities);
  };

  const FilterForm = (
    <section className="h-full px-5 py-4 overflow-y-scroll">
      {/* <KeywordSearchFilter /> */}
      <PropertyFilter
        hotels={hotels}
        vacationRentals={vacationRentals}
        onChangeHotels={setHotels}
        onChangeVacationRentals={setVacationRentals}
      />
      <Divider className="my-6" />
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMinPrice={setMinPrice}
        onChangeMaxPrice={setMaxPrice}
      />
      <SortByFilter sortBy={sortBy} onChangeSortBy={setSortBy} />
      <Divider className="my-6" />
      <StarRatingFilter
        minStarRating={minStarRating}
        maxStarRating={maxStarRating}
        onChangeMinRating={setMinStarRating}
        onChangeMaxRating={setMaxStarRating}
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
    <>
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
    <section className="flex w-full gap-2 px-4 py-3">
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
      {Modals}
    </section>
  );
};

export default HotelSecondarySearchOptions;
