import { useState } from 'react';
import FilterContainer from './FilterContainer';
import Sort from 'public/icons/assets/sort.svg';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import { useTranslation } from 'react-i18next';
import { SORT_BY_OPTIONS } from '../../../constants/sortByOptions';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';

export interface SortByProps {
  sortBy: string;
  onChangeSortBy: (value: string) => void;
}

const SortBy = ({ sortBy, onChangeSortBy }: SortByProps) => {
  const [t] = useTranslation('dining');
  const [showSortModal, setShowSortModal] = useState(false);
  return (
    <FilterContainer>
      <section className="relative">
        <section
          className={`bg-white absolute z-10 border border-dark-300 rounded shadow-container top-full w-full transition-all duration-500 text-dark-1000 ${
            !showSortModal && 'opacity-0 invisible'
          }`}
        >
          <RadioGroup onChange={onChangeSortBy} value={sortBy} gap="gap-0">
            {SORT_BY_OPTIONS.map((option, i) => (
              <Radio
                key={i}
                value={option?.label}
                containerClass={`px-3 py-2 ${
                  i < SORT_BY_OPTIONS.length - 1 && 'border-b border-dark-200'
                }`}
              >
                {t(option.label)}
              </Radio>
            ))}
          </RadioGroup>
        </section>
        <section>
          <button
            className="flex items-center justify-between w-full pl-1 pr-6 border border-gray-300 rounded h-11 borderfocus:ring-primary-500 focus:border-primary-500 "
            onClick={() => setShowSortModal(!showSortModal)}
            onBlur={() => setShowSortModal(false)}
          >
            <section className="flex items-center px-1">
              <span className="px-3 text-primary-1000">
                <Sort />
              </span>
              <span className="text-sm font-normal text-dark-1000 flex leading-[22px]">
                {t(
                  SORT_BY_OPTIONS.find((option) => option.label === sortBy)
                    ?.label ?? SORT_BY_OPTIONS[0].label,
                )}
              </span>
            </section>
            <span className="text-dark-800">
              <Chevron />
            </span>
          </button>
        </section>
      </section>
    </FilterContainer>
  );
};

export default SortBy;
