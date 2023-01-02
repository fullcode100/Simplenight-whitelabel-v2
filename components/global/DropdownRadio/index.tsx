import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Radio, RadioGroup } from '../../../components/global/Radio/Radio';

import Sort from '@/icons/assets/sort.svg';
import Filter from '@/icons/assets/filter.svg';
import Chevron from '@/icons/assets/chevron-down-small.svg';

interface DropdownRadioProps {
  translation: 'hotels' | 'parking' | 'dining';
  sortByVal: string;
  showFilter?: boolean;
  setSortByVal:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  options: string[];
  onClickOption: (value: string) => void;
  onFilterClick?: React.Dispatch<React.SetStateAction<boolean>>;
  // onFilterClick should not be optional but for now i'm leaving this way because other developers don't know about it
}

export const DropdownRadio = ({
  translation,
  sortByVal,
  showFilter = true,
  setSortByVal,
  options,
  onClickOption,
  onFilterClick,
}: DropdownRadioProps) => {
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const handleClickOption = (value: string) => {
    setSortByVal(value);
    setShowSortingDropdown((p) => !p);
    onClickOption(value);
  };
  const [t] = useTranslation(translation);
  return (
    <section className="w-auto flex justify-start items-center gap-4 rounded px-2 lg:px-0 bg-primary-100 lg:bg-transparent">
      <section className="relative">
        <button
          className="flex items-center gap-2 lg:w-[160px] h-6 whitespace-nowrap"
          onClick={() => setShowSortingDropdown(true)}
          onBlur={() => setShowSortingDropdown(true)}
        >
          <span className="text-primary-1000">
            <Sort />
          </span>
          <span className="text-xs font-semibold text-left text-dark-1000 flex-1 ">
            <span className="hidden lg:inline">
              {t('priceLower', sortByVal)}
            </span>
            <span className="inline lg:hidden">{t('sort')}</span>
          </span>
          <span className="text-dark-800">
            <Chevron />
          </span>
        </button>

        <section
          className={`absolute z-10 border border-dark-300 rounded shadow-container top-[100%] right-0 bg-white w-[256px] transition-all duration-500 text-dark-1000 ${
            !showSortingDropdown && 'opacity-0 invisible '
          }`}
        >
          <RadioGroup
            onChange={handleClickOption}
            value={sortByVal}
            gap="gap-0"
          >
            {options.map((option, idx) => (
              <Radio
                key={idx}
                value={option}
                containerClass="px-3 py-2 border-b border-dark-200"
              >
                {t(option)}
              </Radio>
            ))}
          </RadioGroup>
        </section>
      </section>
      {showFilter && (
        <button
          className="flex items-center gap-2 lg:w-[100px] h-6 lg:hidden "
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => (onFilterClick ? onFilterClick(true) : () => {})}
          // the empty function must be removed once other developers have added the right implementation for this component
          onBlur={() => setShowSortingDropdown(false)}
        >
          <span className="text-primary-1000">
            <Filter />
          </span>
          <span className="text-xs font-semibold text-left text-dark-1000 flex-1">
            {t('filter')}
          </span>
        </button>
      )}
    </section>
  );
};
