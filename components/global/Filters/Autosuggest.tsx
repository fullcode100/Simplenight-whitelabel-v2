import { useState } from 'react';
import CloseIcon from 'public/icons/assets/close.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';

interface AutosuggestProps {
  keywordSearchData: string[];
  onChangeKeywordSearch: any;
  keywordSearchPlaceholder: string;
  keywordSearch: string;
  setKeywordSearch: (newKeywordSearch: string) => void;
}

const Autosuggest = ({
  keywordSearchData,
  onChangeKeywordSearch,
  keywordSearchPlaceholder,
  keywordSearch,
  setKeywordSearch,
}: AutosuggestProps) => {
  const suggestions: string[] = keywordSearchData || [];
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (event: any) => {
    const input = event.target.value.toLowerCase();
    const filtered: any = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(input) > -1,
    );
    setFilteredSuggestions(filtered);
    setKeywordSearch(event.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChangeKeywordSearch(suggestion);
    setKeywordSearch(suggestion);
    setFilteredSuggestions([]);
  };

  const renderSuggestions = () => {
    if (keywordSearch.length <= 2) return;
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
      {keywordSearch && (
        <section
          className="absolute z-10 right-2 top-2"
          onClick={() => {
            onChangeKeywordSearch('');
            setKeywordSearch('');
          }}
        >
          <CloseIcon className="text-dark-700 cursor-pointer" />
        </section>
      )}
      <SearchIcon className="absolute left-3 top-2.5 text-dark-700" />
      <input
        type="text"
        className="focus:ring-primary-500 focus:border-primary-500 block w-full h-11 sm:text-sm border-gray-300 rounded pl-10 pr-9 truncate "
        value={keywordSearch}
        onChange={handleChange}
        placeholder={keywordSearchPlaceholder}
      />
      {renderSuggestions()}
    </div>
  );
};

export default Autosuggest;
