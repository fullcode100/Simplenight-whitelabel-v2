import { Dispatch } from 'react';
import IconInput from '../Input/IconInput';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';
import SearchIcon from 'public/icons/assets/magnifier.svg';

export interface KeywordSearchFilterProps {
  keywordSearchLabel: string;
  keywordSearch: string;
  keywordSearchPlaceholder: string;
  onChangeKeywordSearch:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const KeywordSearchFilter = ({
  keywordSearchLabel,
  keywordSearch,
  keywordSearchPlaceholder,
  onChangeKeywordSearch,
}: KeywordSearchFilterProps) => (
  <FilterContainer>
    <FilterTitle label={keywordSearchLabel} />
    <IconInput
      value={keywordSearch}
      placeholder={keywordSearchPlaceholder}
      icon={<SearchIcon className="text-dark-700" />}
      onChange={(e) => onChangeKeywordSearch(e.target.value)}
      autoFocus
    />
  </FilterContainer>
);

export default KeywordSearchFilter;
