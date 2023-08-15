import classnames from 'classnames';
import useCategories, { CategoryInfo } from 'hooks/category/useCategories';
import { Tab } from 'components/global/Tabs/types';

interface categoryProps {
  handleTabClick: (tab: Tab | CategoryInfo) => void;
  activeTab: Tab;
}

const CategorySelect = ({ activeTab, handleTabClick }: categoryProps) => {
  const categories = useCategories();

  const currentCategory = activeTab || categories?.[0];

  if (categories?.length <= 1) return <></>;

  return (
    <section className="mt-2 text-dark-1000">
      {categories.map((category, i) => {
        const isActive = currentCategory.slug === category.slug;
        const className = classnames(
          'px-4 py-3 text-base cursor-pointer flex items-center gap-2',
          {
            'bg-primary-100 text-primary-1000': isActive,
          },
        );
        return (
          <section
            key={i}
            className={className}
            onClick={() => handleTabClick(category)}
          >
            <div className="flex items-center justify-center w-6 h-6">
              {category.icon}
            </div>
            <p className="capitalize">{category.name}</p>
          </section>
        );
      })}
    </section>
  );
};

export default CategorySelect;
