import { Dispatch } from 'react';
import IconInput from '../Input/IconInput';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';
import SearchIcon from 'public/icons/assets/magnifier.svg';

export interface KeywordSearchFilterProps {
  keywordSearchLabel: string;
  keywordSearch: string;
  keywordSearchPlaceholder: string;
  setKeywordSearch:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const KeywordSearchFilter = ({
  keywordSearchLabel,
  keywordSearch,
  keywordSearchPlaceholder,
  setKeywordSearch,
}: KeywordSearchFilterProps) => (
  <FilterContainer>
    <FilterTitle label={keywordSearchLabel} />
    <IconInput
      value={keywordSearch}
      placeholder={keywordSearchPlaceholder}
      icon={<SearchIcon className="text-dark-700" />}
      onChange={(e) => setKeywordSearch(e.target.value)}
    />
  </FilterContainer>
);

export default KeywordSearchFilter;
