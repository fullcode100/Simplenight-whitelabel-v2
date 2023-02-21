import useCategories from './useCategories';

const useDisplayCategory = () => {
  const categories = useCategories();
  const displayCategories = categories?.length > 1;

  return displayCategories;
};

export default useDisplayCategory;
