export const sortByAdapter = (value: string): string => {
  if (value === 'sortByPriceAsc') return 'price';
  if (value === 'sortByPriceDesc') return '-price';
  if (value === 'sortByStarRatingDesc') return '-rating';
  if (value === 'sortByStarRatingAsc') return 'rating';
  return 'recommended';
};
