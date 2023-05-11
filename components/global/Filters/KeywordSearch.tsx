import { Dispatch } from 'react';
import FilterContainer from './FilterContainer';
import { Heading } from '@simplenight/ui';
import Autosuggest from './Autosuggest';

export interface KeywordSearchFilterProps {
  keywordSearchLabel: string;
  keywordSearch: string;
  keywordSearchPlaceholder: string;
  keywordSearchData: string[];
  onChangeKeywordSearch:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
}

const KeywordSearchFilter = ({
  keywordSearchLabel,
  keywordSearchPlaceholder,
  onChangeKeywordSearch,
  keywordSearchData,
  keywordSearch,
}: KeywordSearchFilterProps) => {
  return (
    <FilterContainer>
      <Heading className="pt-6 pb-1" tag="h5">
        {keywordSearchLabel}
      </Heading>
      <Autosuggest
        keywordSearchData={keywordSearchData}
        onChangeKeywordSearch={onChangeKeywordSearch}
        keywordSearchPlaceholder={keywordSearchPlaceholder}
        keywordSearch={keywordSearch}
      />
    </FilterContainer>
  );
};

export default KeywordSearchFilter;
