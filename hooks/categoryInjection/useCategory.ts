import { categoryOptions } from 'providers/categoryProvider';

export const useCategory = (categoryName: string) =>
  categoryOptions.find((option) => option.value === categoryName);
