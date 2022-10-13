import useCategories from 'hooks/category/useCategories';

export const useCategoryIcon = (categoryName: string) => {
  let icon = <></>;
  const categories = useCategories();
  if (categories) {
    const activeCategory = categories.findIndex(
      (category) => category.type === categoryName,
    );
    if (activeCategory !== -1) {
      icon = categories[activeCategory].icon;
    }
  }
  return icon;
};
