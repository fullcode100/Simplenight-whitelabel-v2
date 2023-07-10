import React, { useState, MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import FiltersIcon from 'public/icons/assets/filters.svg';
import { ViewActions } from '../search/ViewActions/ViewActions';

interface ResultsOptionsBarProps {
  results?: number | string;
  onClickFilter?: (event?: MouseEvent<HTMLElement>) => void;
  onClickSort?: (event?: MouseEvent<HTMLElement> | string) => void;
  sortByOptions?: Array<{ value: string; label: string }>;
  defaultOption?: string;
  filterView?: string;
  setFilterView?: React.Dispatch<React.SetStateAction<string>> | null;
  onOpenFilters?: ((event?: MouseEvent<HTMLElement>) => void) | null;
  showFilters?: boolean;
}

const ResultsOptionsBar = ({
  results,
  onClickFilter,
  onClickSort,
  sortByOptions,
  defaultOption,
  filterView = 'list',
  setFilterView = null,
  onOpenFilters = null,
  showFilters = false,
}: ResultsOptionsBarProps) => {
  const [sortBy, setSortBy] = useState<string>(
    defaultOption || sortByOptions?.[0].value || '',
  );
  const [showSortModal, setShowSortModal] = useState(false);

  const [tg] = useTranslation('global');
  const resultsLabel = tg('results', 'Results');
  const sortLabel = tg('sort', 'Sort');
  const filterLabel = tg('filter', 'Filter');

  useEffect(() => {
    if (defaultOption) {
      setSortBy(defaultOption);
    }
  }, [defaultOption]);

  const handleSortBy = (value: string) => {
    setSortBy(value);
    if (onClickSort) {
      onClickSort(value);
    }
  };

  return (
    <section className="w-full relative">
      <section
        className={`absolute z-[15] border border-dark-300 rounded shadow-container top-10 bg-white w-[256px] lg:w-[223px] right-0 transition-all duration-500 text-dark-1000 ${
          !showSortModal && 'opacity-0 invisible'
        }`}
      >
        <RadioGroup onChange={handleSortBy} value={sortBy} gap="gap-0">
          {sortByOptions?.map((option, i) => (
            <Radio
              key={i}
              value={option?.value}
              containerClass={`px-3 py-2 ${
                i < sortByOptions.length - 1 && 'border-b border-dark-200'
              }`}
            >
              {tg(option.label)}
            </Radio>
          ))}
        </RadioGroup>
      </section>

      <section className="flex items-center justify-between pt-3 pb-3 lg:mt-1 lg:pb-0">
        <div className="flex items-center">
          {!showFilters && onOpenFilters && (
            <button
              className="border-2 p-2 m-2 rounded-full hover:bg-primary-800 hover:text-white text-primary-1000 border-primary-100"
              onClick={() => onOpenFilters()}
            >
              <FiltersIcon />
            </button>
          )}
          <p className="lg:text-[18px] text-[16px] text-dark-800 lg:pl-0 pl-4">
            {results} {resultsLabel}
          </p>
        </div>

        <section className="relative flex items-center gap-2 px-2 py-1 rounded bg-primary-100 lg:px-0 lg:bg-white">
          <ViewActions view={filterView} setview={setFilterView} />
        </section>
      </section>
    </section>
  );
};

export default ResultsOptionsBar;
