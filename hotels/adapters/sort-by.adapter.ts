export const sortByAdapter = (value: string): string => {
  if (value === 'sortByPriceDesc') return '-price';
  if (value === 'sortByRatingDesc') return '-rating';
  if (value === 'sortByRatingAsc') return 'rating';
  return 'price';
};
