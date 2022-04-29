import { useCategory } from 'hooks/categoryInjection/useCategory';
import { categoryOptions } from '../../../providers/categoryProvider';

const SearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const searchOption = useCategory(searchType);

  const searchForm = searchOption?.searchForm;

  return searchForm ?? null;
};

export default SearchCategoryForm;
