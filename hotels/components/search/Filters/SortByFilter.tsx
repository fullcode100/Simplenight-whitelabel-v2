import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';

import { RadioGroup, Radio } from 'components/global/Radio/Radio';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';
import { SORT_BY_OPTIONS } from 'hotels/constants/sortByOptions';

interface SortByFilterProps {
  sortBy: string;
  onChangeSortBy:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const SortByFilter = ({ sortBy, onChangeSortBy }: SortByFilterProps) => {
  const [t, i18n] = useTranslation('hotels');
  const sortByLabel = t('sortBy', 'Sort By');

  return (
    <FilterContainer>
      <FilterTitle label={sortByLabel} className="mb-4" />
      <RadioGroup onChange={onChangeSortBy} value={sortBy}>
        {SORT_BY_OPTIONS.map((option, i) => (
          <Radio key={i} value={option?.value}>
            {t(option.label)}
          </Radio>
        ))}
      </RadioGroup>
    </FilterContainer>
  );
};

export default SortByFilter;
