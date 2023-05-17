import { useState } from 'react';
import CloseIcon from 'public/icons/assets/close.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';

interface AutosuggestProps {
  keywordSearchData: string[];
  onChangeKeywordSearch: any;
  keywordSearchPlaceholder: string;
  keywordSearch: string;
  keywordState: string;
  setKeywordState: React.Dispatch<React.SetStateAction<string>>;
}

const Autosuggest = ({
  keywordSearchData,
  onChangeKeywordSearch,
  keywordSearchPlaceholder,
  keywordState,
  setKeywordState,
}: AutosuggestProps) => {
  const suggestions: string[] = keywordSearchData || [];
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (event: any) => {
    const input = event.target.value.toLowerCase();
    const filtered: any = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(input) > -1,
    );
    setFilteredSuggestions(filtered);
    setKeywordState(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChangeKeywordSearch(suggestion);
    setKeywordState(suggestion);
    setFilteredSuggestions([]);
  };

  const renderSuggestions = () => {
    if (keywordState.length <= 2) return;
    if (filteredSuggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {filteredSuggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="pl-4 px-2 hover:bg-blue-300 cursor-pointer"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="relative">
      {keywordState && (
        <section
          className="absolute z-10 right-2 top-2"
          onClick={() => {
            onChangeKeywordSearch('');
            setKeywordState('');
          }}
        >
          <CloseIcon className="text-dark-700 cursor-pointer" />
        </section>
      )}
      <SearchIcon className="absolute left-3 top-2.5 text-dark-700" />
      <input
        type="text"
        className="focus:ring-primary-500 focus:border-primary-500 block w-full h-11 sm:text-sm border-gray-300 rounded pl-10 pr-9 truncate "
        value={keywordState}
        onChange={handleChange}
        placeholder={keywordSearchPlaceholder}
      />
      {renderSuggestions()}
    </div>
  );
};

export default Autosuggest;
