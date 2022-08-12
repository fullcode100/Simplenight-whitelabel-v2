import { getCategoryOptions } from 'providers/categoryProvider';

export const useCategory = (categoryName: string) => {
  return getCategoryOptions().find((option) => {
    return option.value === categoryName;
  });
};
