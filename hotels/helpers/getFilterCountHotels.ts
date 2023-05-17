import { FilterCriteria } from 'hotels/hooks/useFilterHotels';

const getFilterCountHotels = (
  criteria: FilterCriteria,
  limits: number[],
): number => {
  let count = 0;
  const minPrice = limits[0] || 0;
  const maxPrice = limits[1] || 5000;

  if (criteria.keywordSearch !== '') count++;
  if (
    parseInt(criteria.MinPrice) !== minPrice ||
    parseInt(criteria.MaxPrice) !== maxPrice
  )
    count++;
  if (criteria.MinRange !== '1' || criteria.MaxRange !== '5') count++;
  if (criteria.sortCriteria !== 'recommended') count++;
  return count;
};

export default getFilterCountHotels;
