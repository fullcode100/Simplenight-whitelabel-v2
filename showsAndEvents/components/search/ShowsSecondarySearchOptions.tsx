import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import SeatsFilter from './Filters/SeatsFilter';
import PriceRangeFilter from './Filters/PriceRangeFilter';
import DistanceFilter from './Filters/DistanceFilter';

import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';

import FilterIcon from 'public/icons/assets/filter.svg';
import ResultsOptionsBar from '../ResultsOptionsBar/ResultsOptionsBar';
import { thingToDo } from '../../mocks/showsAndEventsMock';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const ShowsSecondarySearchOptions = () => {
  const router = useRouter();
  const [queryFilter, setQueryFilters] = useState(router.query);
  const setQueryParams = useQuerySetter();

  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

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
  const [seats, setSeats] = useState<string>(
    (queryFilter.seats as string) || '6',
  );
  const [distance, setDistance] = useState<string>(
    (queryFilter.distance as string) || '3000',
  );

  const [t, i18n] = useTranslation('events');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const clearFiltersText = t('clearFilters', 'Clear filters');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleClearFilters = () => {
    setQueryParams({
      minPrice: '',
      maxPrice: '',
      isTotalPrice: '',
      distance: '',
      seats: '',
    });
  };

  const handleDispatchFilters = () => {
    setFilterModalOpen(false);
    setQueryParams({
      ...queryFilter,
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...((minPrice || maxPrice) && { isTotalPrice: 'false' }),
      seats,
      distance,
    });
  };

  const FilterForm = (
    <section className="h-full px-5 py-4 overflow-y-scroll">
      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMinPrice={setMinPrice}
        onChangeMaxPrice={setMaxPrice}
      />
      <Divider className="my-6" />
      <DistanceFilter value={distance} onChangeDistance={setDistance} />
      <Divider className="my-6" />
      <SeatsFilter value={seats} onChangeSeats={setSeats} />
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

  return (
    <section className="flex w-full bg-white gap-2 px-4 border-t border-dark-300">
      <ResultsOptionsBar
        results={thingToDo.length}
        onClickFilter={handleFilterButtonClick}
      />
      {Modals}
    </section>
  );
};

export default ShowsSecondarySearchOptions;
