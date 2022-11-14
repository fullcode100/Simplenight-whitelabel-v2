import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Pill from '../Pill';
import styles from './PillContainer.module.css';
import { Category } from 'thingsToDo/types/response/ThingsSearchResponse';

interface PillContainerProps {
  options: Category[];
  appliedFilters: string[];
  setAppliedFilters: (value: string[]) => void;
  limit?: number;
}

const PillContainer = ({
  options,
  appliedFilters,
  setAppliedFilters,
  limit,
}: PillContainerProps) => {
  const SHOW_ALL_ID = 'show-all';
  const [t] = useTranslation('things');
  const showAllLabel = t('showAll', 'Show all');
  const activitiesLabel = t('activities', 'Activities');

  const [appliedModalFilters, setAppliedModalFilters] = useState<Category[]>(
    [],
  );
  const [modalFilters, setModalFilters] = useState(
    options.slice(limit, options.length - 1),
  );
  const displayedFilters = options.slice(0, limit);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const showAllFilter = {
    id: SHOW_ALL_ID,
    label: showAllLabel,
  };

  useEffect(() => {
    setModalFilters(options.slice(limit, options.length - 1));
  }, [options]);

  const orderFiltersAlphabetically = (categories: Category[]) => {
    categories.sort((a: Category, b: Category) => {
      return a.label.localeCompare(b.label);
    });
    return categories;
  };

  const addFilter = (selectedFilter: string) => {
    setAppliedFilters([...appliedFilters, selectedFilter]);
  };

  const addModalFilter = (selectedFilterObject: Category) => {
    setAppliedModalFilters([...appliedModalFilters, selectedFilterObject]);
    const newModalFilters = modalFilters.filter(
      (filter) => filter.id !== selectedFilterObject.id,
    );
    setModalFilters(orderFiltersAlphabetically(newModalFilters));
    setIsFilterModalOpen(false);
  };

  const removeModalFilter = (selectedFilterObject: Category) => {
    setAppliedModalFilters(
      appliedModalFilters.filter(
        (appliedModalFilter) =>
          appliedModalFilter.id !== selectedFilterObject.id,
      ),
    );
    const newModalFilters = [...modalFilters, selectedFilterObject];
    setModalFilters(orderFiltersAlphabetically(newModalFilters));
  };

  const handleModalFilters = (selectedFilterId: string) => {
    const selectedFilterObject = options.filter(
      (option) => option.id === selectedFilterId,
    )[0];
    const isFilterApplied = appliedModalFilters.some(
      (selectedFilter) => selectedFilter.id === selectedFilterId,
    );
    if (isFilterApplied) {
      removeModalFilter(selectedFilterObject);
    } else {
      addModalFilter(selectedFilterObject);
    }
  };
  const removeFilter = (selectedFilter: string) => {
    setAppliedFilters(
      appliedFilters.filter((filter) => filter !== selectedFilter),
    );
  };
  const updateFilters = (selectedFilter: string) => {
    if (appliedFilters.includes(selectedFilter)) {
      removeFilter(selectedFilter);
    } else {
      addFilter(selectedFilter);
    }
    const isModalFilter =
      appliedModalFilters.some(
        (appliedModalFilter) => appliedModalFilter.id === selectedFilter,
      ) ||
      modalFilters.some((modalFilter) => modalFilter.id === selectedFilter);
    if (isModalFilter) handleModalFilters(selectedFilter);
  };
  const resetFilters = () => {
    setAppliedFilters([]);
    setAppliedModalFilters([]);
    setModalFilters(options.slice(limit, options.length - 1));
  };
  const handleFilterChange = (selectedFilter: string) => {
    if (selectedFilter === SHOW_ALL_ID) {
      resetFilters();
    } else {
      updateFilters(selectedFilter);
    }
  };

  const FilterModalButton = () => (
    <button
      className=" text-dark-800 leading-none inline border bg-white border-dark-300 text-dark-900 rounded-4 px-3 py-2 capitalize text-xs font-semibold shrink-0 hover:bg-dark-100  "
      onClick={() => setIsFilterModalOpen(true)}
    >
      {modalFilters.length} +
    </button>
  );

  const FilterModal = () => (
    <FullScreenModal
      open={isFilterModalOpen}
      closeModal={() => setIsFilterModalOpen(false)}
      title={activitiesLabel}
      className={
        'lg:max-w-[842px] lg:max-h-[660px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-4 overflow-hidden shadow-full'
      }
    >
      <div className="h-full overflow-y-scroll p-4 md:p-6 ">
        <section className="  grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 text-center w-full">
          {modalFilters.map((filter) => (
            <Pill
              key={filter.id}
              label={filter.label}
              value={filter.id}
              checked={appliedFilters.includes(filter.id)}
              className={'py-4'}
            />
          ))}
        </section>
      </div>
    </FullScreenModal>
  );
  return (
    <fieldset
      onChange={(e: React.ChangeEvent<HTMLFieldSetElement>) => {
        {
          const element = e.target as unknown as HTMLInputElement;
          handleFilterChange(element.value);
        }
      }}
      className={`px-5 flex gap-2 overflow-auto mt-6 ${styles.noScrollbar}`}
    >
      <Pill
        label={showAllFilter.label}
        value={showAllFilter.id}
        checked={appliedFilters.length === 0}
      />
      {appliedModalFilters &&
        appliedModalFilters.map((option) => (
          <Pill
            key={option.id}
            label={option.label}
            value={option.id}
            checked={appliedFilters.includes(option.id)}
          />
        ))}
      {displayedFilters.map((option) => (
        <Pill
          key={option.id}
          label={option.label}
          value={option.id}
          checked={appliedFilters.includes(option.id)}
        />
      ))}
      <FilterModalButton />
      <FilterModal />
    </fieldset>
  );
};

export default PillContainer;
