import useCategories from './useCategories';

export const useCategoryType = (categoryName: string) => {
  const categories = useCategories();
  return categories.find((category) => category.type === categoryName);
};

export const useCategorySlug = (categorySlug: string) => {
  const categories = useCategories();
  return categories.find((category) => category.slug === categorySlug);
};
