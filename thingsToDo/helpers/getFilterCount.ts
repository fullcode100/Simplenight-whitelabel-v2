interface FiltersApplied {
  keywordSearch: string;
  price: { minPrice: string; maxPrice: string };
  freeCancellation: boolean;
  starRating: { minStarRating: string; maxStarRating: string };
  sortBy: string;
}
const getFilterCount = (appliedFilters: FiltersApplied): number => {
  let count = 0;

  if (appliedFilters.keywordSearch !== '') count++;
  if (
    appliedFilters.price.minPrice !== '0' ||
    appliedFilters.price.maxPrice !== '5000'
  )
    count++;
  if (appliedFilters.freeCancellation) count++;
  if (
    appliedFilters.starRating.minStarRating !== '1' ||
    appliedFilters.starRating.maxStarRating !== '5'
  )
    count++;
  if (appliedFilters.sortBy !== 'recommended') count++;

  return count;
};

export default getFilterCount;
