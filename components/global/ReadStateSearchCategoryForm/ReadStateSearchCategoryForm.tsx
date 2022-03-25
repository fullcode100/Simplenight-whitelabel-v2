import { useCategory } from 'hooks/categoryInjection/useCategory';

const ReadStateSearchCategoryForm = ({
  searchType,
}: {
  searchType: string;
}) => {
  const category = useCategory(searchType);

  const searchForm = category?.readStateSearchForm;

  return searchForm ?? null;
};

export default ReadStateSearchCategoryForm;
