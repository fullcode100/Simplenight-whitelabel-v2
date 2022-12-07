import React, { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Sort from 'public/icons/assets/sort.svg';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import Filter from 'public/icons/assets/filter.svg';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';

interface ResultsOptionsBarProps {
  results?: number | string;
  onClickFilter?: (event?: MouseEvent<HTMLElement>) => void;
  onClickSort?: (event?: MouseEvent<HTMLElement>) => void;
  sortByOptions?: Array<{ value: string; label: string }>;
}

const ResultsOptionsBar = ({
  results,
  onClickFilter,
  sortByOptions,
}: ResultsOptionsBarProps) => {
  const [sortBy, setSortBy] = useState<string>(sortByOptions?.[0].value || '');
  const [showSortModal, setShowSortModal] = useState(false);

  const [tg] = useTranslation('global');
  const resultsLabel = tg('results', 'Results');
  const sortLabel = tg('sort', 'Sort');
  const filterLabel = tg('filter', 'Filter');

  return (
    <section className="w-full relative">
      <section
        className={`absolute z-[15] border border-dark-300 rounded shadow-container top-10 bg-white w-[256px] lg:w-[223px] right-0 transition-all duration-500 text-dark-1000 ${
          !showSortModal && 'opacity-0 invisible'
        }`}
      >
        <RadioGroup onChange={setSortBy} value={sortBy} gap="gap-0">
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
        <p className="text-sm leading-5 lg:text-[20px] lg:leading-[24px] font-semibold">
          {results} {resultsLabel}
        </p>
        <section className="relative items-center gap-2 px-2 py-1 rounded bg-primary-100 lg:px-0 lg:bg-white hidden">
          <button
            className="flex items-center gap-1"
            onClick={() => setShowSortModal(!showSortModal)}
            onBlur={() => setShowSortModal(false)}
          >
            <span className="text-primary-1000">
              <Sort />
            </span>
            <span className="text-xs font-semibold text-dark-1000 lg:hidden">
              {sortLabel}
            </span>
            <span className="hidden text-xs font-semibold text-dark-1000 lg:flex">
              {tg(
                sortByOptions?.find((option) => option.value == sortBy)
                  ?.label || '',
              )}
            </span>
            <span className="text-dark-800">
              <Chevron />
            </span>
          </button>
          <button
            className="flex items-center gap-1 lg:hidden"
            onClick={onClickFilter}
          >
            <span className="text-primary-1000">
              <Filter />
            </span>
            <span className="text-xs font-semibold text-dark-1000 lg:hidden">
              {filterLabel}
            </span>
          </button>
        </section>
      </section>
    </section>
  );
};

export default ResultsOptionsBar;
