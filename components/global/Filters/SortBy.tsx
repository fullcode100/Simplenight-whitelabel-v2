import { useState } from 'react';
import FilterContainer from './FilterContainer';
import Sort from 'public/icons/assets/sort.svg';
import Chevron from 'public/icons/assets/chevron-down-small.svg';
import { useTranslation } from 'react-i18next';
import { SORT_BY_OPTIONS } from 'thingsToDo/constants/sortByOptions';
import { RadioGroup, Radio } from 'components/global/Radio/Radio';

export interface SortByProps {
  sortBy: string;
  onChangeSortBy: any;
}

const SortBy = ({ sortBy, onChangeSortBy }: SortByProps) => {
  const [tg] = useTranslation('global');
  const [showSortModal, setShowSortModal] = useState(false);
  return (
    <FilterContainer>
      <section className="relative">
        <section
          className={`bg-white absolute z-10 border border-dark-300 rounded shadow-container top-8 w-[335px] left-1 lg:left-1 transition-all duration-500 text-dark-1000 ${
            !showSortModal && 'opacity-0 invisible'
          }`}
        >
          <RadioGroup onChange={onChangeSortBy} value={sortBy} gap="gap-0">
            {SORT_BY_OPTIONS.map((option, i) => (
              <Radio
                key={i}
                value={option?.value}
                containerClass={`px-3 py-2 ${
                  i < SORT_BY_OPTIONS.length - 1 && 'border-b border-dark-200'
                }`}
              >
                {tg(option.label)}
              </Radio>
            ))}
          </RadioGroup>
        </section>
        <section>
          <button
            className="flex w-full justify-between items-center pr-6 pl-1 h-11 border border-gray-300 rounded borderfocus:ring-primary-500 focus:border-primary-500 "
            onClick={() => setShowSortModal(!showSortModal)}
            onBlur={() => setShowSortModal(false)}
          >
            <section className="flex items-center px-1">
              <span className="text-primary-1000 px-3">
                <Sort />
              </span>
              <span className="text-sm font-normal text-dark-1000 flex leading-[22px]">
                {tg(
                  SORT_BY_OPTIONS.find((option) => option.value == sortBy)
                    ?.label ?? '',
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
