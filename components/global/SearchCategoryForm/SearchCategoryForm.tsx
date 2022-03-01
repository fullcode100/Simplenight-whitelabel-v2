import { categoryOptions } from '../../../providers/categoryProvider';

const SearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const searchOption = categoryOptions.find(
    (option) => option.value === searchType,
  );

  const searchForm = searchOption?.searchForm;

  return searchForm ?? null;
};

export default SearchCategoryForm;
