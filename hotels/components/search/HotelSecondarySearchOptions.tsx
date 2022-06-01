import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import Rating from 'components/global/Rating/Rating';
import Checkbox from 'components/global/Checkbox/Checkbox';
import hotelFiltersMock from 'mocks/hotelFiltersMock';
import Select from 'components/global/Select/Select';
import useQuery from 'hooks/pageInteraction/useQuery';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import IconInput from 'components/global/Input/IconInput';
import MapIcon from 'public/icons/assets/map.svg';
import FilterIcon from 'public/icons/assets/filter.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const INITIAL_RATING_VALUE = 3;
const HotelSecondarySearchOptions = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(INITIAL_RATING_VALUE);
  const [checkedLabels, setCheckedLabels] = useState<string[]>([]);

  const [t, i18n] = useTranslation('hotels');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t(
    'searchKeywordPlaceholder',
    'Hotel Name, Landmark, Location, etc.',
  );
  const starRatingLabel = t('starRating', 'Star Rating');
  const sortByLabel = t('sortBy', 'Sort By');
  const mapViewLabel = t('mapView', 'Map View');
  const listViewLabel = t('listView', 'List View');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleRatingFilterChange = (newRating: number) => {
    setRatingValue(newRating);
  };

  const handleLabelCheckboxChange = (label: string, isChecked: boolean) => {
    const newCheckedLabels = checkedLabels.filter((value) => value !== label);

    if (isChecked) {
      newCheckedLabels.push(label);
    }

    setCheckedLabels(newCheckedLabels);
  };

  const FilterTitle = ({ label }: { label: string }) => (
    <label className="mb-2">{label}</label>
  );

  const FilterContainer = ({ children }: { children?: any }) => (
    <section className="px-4 mt-4 mb-6 flex flex-col">{children}</section>
  );

  const KeywordSearchFilter = () => (
    <FilterContainer>
      <FilterTitle label={keywordSearchLabel} />
      <IconInput
        value=""
        placeholder={searchKeywordPlaceholder}
        icon={<SearchIcon className="text-dark-700" />}
        onChange={() => {
          <></>;
        }}
      />
    </FilterContainer>
  );

  const RatingFilter = () => (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <Rating
        value={ratingValue + ''}
        onChange={handleRatingFilterChange}
        editable
      />
    </FilterContainer>
  );

  const LabelFilter = () => (
    <FilterContainer>
      <Checkbox
        items={hotelFiltersMock}
        title="Filters checkbox"
        onChange={handleLabelCheckboxChange}
      />
    </FilterContainer>
  );

  const SortByFilter = () => (
    <FilterContainer>
      <FilterTitle label={sortByLabel} />
      <Select options={['Price', 'Rating', 'Popularity']} />
    </FilterContainer>
  );

  const FilterForm = () => (
    <section className="py-4">
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
        primaryButtonAction={() => setFilterModalOpen(false)}
      >
        <FilterForm />
      </FullScreenModal>
    </>
  );

  const { view = 'list' } = useQuery();
  const isListView = view === 'list';
  const viewParam = isListView ? 'map' : 'list';
  const viewButtonValue = isListView ? mapViewLabel : listViewLabel;

  const setQueryParams = useQuerySetter();

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
      />
      <Button
        value={viewButtonValue}
        size="full-sm"
        type="outlined"
        leftIcon={<MapIcon />}
        onClick={handleChangeResultView}
      />
      <Modals />
    </section>
  );
};

export default HotelSecondarySearchOptions;
