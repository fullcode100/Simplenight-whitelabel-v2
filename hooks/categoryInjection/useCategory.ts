import { categoryOptions } from 'providers/categoryProvider';

export const useCategory = (categoryName: string) => {
  return categoryOptions.find((option) => {
    return option.value === categoryName;
  });
};
