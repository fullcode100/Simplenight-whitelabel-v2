import { searchTypeOptions } from '../../../helpers/searchConstants';

const SearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const searchOption = searchTypeOptions.find(
    (option) => option.value === searchType,
  );

  const searchForm = searchOption?.searchForm;

  return searchForm ?? null;
};

export default SearchCategoryForm;
