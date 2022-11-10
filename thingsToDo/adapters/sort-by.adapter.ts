export const sortByAdapter = (value: string): string => {
  if (value === 'sortByPriceAsc') return 'price';
  if (value === 'sortByPriceDesc') return '-price';
  if (value === 'sortByStarRatingDesc') return '-star_rating';
  if (value === 'sortByStarRatingAsc') return 'star_rating';
  return 'recommended';
};
