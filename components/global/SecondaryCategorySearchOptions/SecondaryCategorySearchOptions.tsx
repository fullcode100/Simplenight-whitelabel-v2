import React from 'react';
import { useCategory } from 'hooks/categoryInjection/useCategory';

interface SecondaryCategorySearchOptionsProps {
  searchType: string;
}

const SecondaryCategorySearchOptions = ({
  searchType,
}: SecondaryCategorySearchOptionsProps) => {
  const category = useCategory(searchType);

  return category?.secondarySearchOptions ?? null;
};

export default SecondaryCategorySearchOptions;
