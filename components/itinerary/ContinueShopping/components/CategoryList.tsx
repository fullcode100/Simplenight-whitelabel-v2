import CategoriesIcons from './CategoriesIcons';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
  categoryList: any[];
}

const CategoryList = ({ categoryList }: CategoryListProps) => {
  return (
    <>
      {categoryList.map((singleCategory, index) => {
        const categoryItem = CategoriesIcons.find((categories) => {
          if (categories.category.includes(singleCategory[0])) {
            return true;
          }
          return false;
        });

        if (categoryItem) {
          return (
            <>
              <CategoryItem
                key={categoryItem.category}
                text={categoryItem.text}
                icon={categoryItem.icon}
                url={categoryItem.category}
              />
              {index < categoryList.length - 1 && (
                <div className="relative">
                  <div className="w-full border-t border-gray-300" />
                </div>
              )}
            </>
          );
        }
      })}
    </>
  );
};

export default CategoryList;
