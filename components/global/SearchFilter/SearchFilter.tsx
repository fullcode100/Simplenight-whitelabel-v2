import { useCategory } from 'hooks/categoryInjection/useCategory';

interface SearchFilterProps {
  searchType: string;
}

const SearchFilter = ({ searchType }: SearchFilterProps) => {
  const category = useCategory(searchType);

  return category?.filterOptions ?? null;
};

export default SearchFilter;
