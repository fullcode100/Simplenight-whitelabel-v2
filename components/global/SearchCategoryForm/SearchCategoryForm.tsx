import { injectProps } from 'helpers/reactUtils';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { Tab } from 'components/global/Tabs/types';

const SearchCategoryForm = ({ activeTab }: { activeTab: Tab }) => {
  const searchOption = useCategory(
    activeTab?.type === 'transportation' && activeTab?.slug
      ? activeTab?.slug
      : activeTab?.type,
  );

  const searchForm = injectProps(searchOption?.searchForm, {
    hasReRoute: true,
    slug: activeTab?.slug,
  });

  return searchForm ?? null;
};

export default SearchCategoryForm;
