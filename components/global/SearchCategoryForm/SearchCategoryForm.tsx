import { injectProps } from 'helpers/reactUtils';
import { useCategory } from 'hooks/categoryInjection/useCategory';

const SearchCategoryForm = ({ searchType }: { searchType: string }) => {
  const searchOption = useCategory(searchType);

  const searchForm = injectProps(searchOption?.searchForm, {
    hasReRoute: true,
  });

  return searchForm ?? null;
};

export default SearchCategoryForm;
