import { FilterCriteria } from 'hotels/hooks/useFilterHotels';

const getFilterCountHotels = (criteria: FilterCriteria): number => {
  let count = 0;

  if (criteria.keywordSearch !== '') count++;
  if (criteria.MinPrice !== '0' || criteria.MaxPrice !== '5000') count++;
  if (criteria.MinRange !== '1' || criteria.MaxRange !== '5') count++;
  if (criteria.sortCriteria !== 'recommended') count++;

  return count;
};

export default getFilterCountHotels;
