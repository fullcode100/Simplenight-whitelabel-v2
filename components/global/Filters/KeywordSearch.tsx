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
  keywordState: string;
  setKeywordState: React.Dispatch<React.SetStateAction<string>>;
}

const KeywordSearchFilter = ({
  keywordSearchLabel,
  keywordSearchPlaceholder,
  onChangeKeywordSearch,
  keywordSearchData,
  keywordSearch,
  keywordState,
  setKeywordState,
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
        keywordState={keywordState}
        setKeywordState={setKeywordState}
      />
    </FilterContainer>
  );
};

export default KeywordSearchFilter;
