import React from 'react';
import { useCategory } from 'hooks/categoryInjection/useCategory';

interface SearchResultDisplayProps {
  searchType: string;
}

const SearchResultDisplay = ({ searchType }: SearchResultDisplayProps) => {
  const category = useCategory(searchType);

  return category?.resultsDisplay ?? null;
};

export default SearchResultDisplay;
