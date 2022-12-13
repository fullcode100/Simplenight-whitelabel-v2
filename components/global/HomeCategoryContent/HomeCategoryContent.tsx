import { injectProps } from 'helpers/reactUtils';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { Tab } from 'components/global/Tabs/types';

const HomeCategoryContent = ({ activeTab }: { activeTab: Tab }) => {
  const category = useCategory(activeTab?.type);

  const homeDisplay = injectProps(category?.homeDisplay, {});

  return homeDisplay ?? null;
};

export default HomeCategoryContent;
