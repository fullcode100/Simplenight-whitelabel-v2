import { FilterCriteria } from 'hotels/hooks/useFilterHotels';

const getFilterCountHotels = (
  criteria: FilterCriteria,
  limits: number[],
  optionsLength: number,
): number => {
  let count = 0;
  if (limits.length === 0) return count;
  const minPrice = limits[0];
  const maxPrice = limits[1];

  if (criteria.keywordSearch !== '') count++;
  if (
    parseInt(criteria.MinPrice) !== minPrice ||
    parseInt(criteria.MaxPrice) !== maxPrice
  )
    count++;
  if (criteria.MinRange !== '1' || criteria.MaxRange !== '5') count++;
  if (criteria.sortCriteria !== 'recommended') count++;
  if (criteria.selectedAmenities.length < optionsLength) count++;
  return count;
};

export default getFilterCountHotels;
