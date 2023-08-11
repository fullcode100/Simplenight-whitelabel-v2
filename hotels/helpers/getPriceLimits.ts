import { SearchItem } from 'hotels/types/adapters/SearchItem';
import {
  FilterCriteria,
  FilterFunctionKeys,
  criteriaFilterFunctions,
} from '../hooks/useFilterHotels';

export const getPriceLimits = (
  hotels: SearchItem[],
  criteria: FilterCriteria,
) => {
  const limits = [0, 5000];
  let filtered = [...hotels];
  Object.entries(criteria).forEach(([key, value]) => {
    key = key || 'sortCriteria';
    if (criteriaFilterFunctions[key as FilterFunctionKeys]) {
      if (
        key !== 'MinPrice' &&
        key !== 'MaxPrice' &&
        key !== 'sortCriteria' &&
        value
      ) {
        const filterFunc = criteriaFilterFunctions[key as FilterFunctionKeys];
        if (typeof filterFunc === 'function') {
          filtered = filterFunc(filtered, value);
        }
      }
    }
  });
  if (filtered.length === 0) return limits;
  limits[0] = Math.floor(
    Math.min(
      ...filtered.map(
        (h) =>
          h.minRate.min_rate.rate.rate_breakdown?.total_base_amount?.amount,
      ),
    ),
  );
  limits[1] = Math.ceil(
    Math.max(
      ...filtered.map(
        (h) =>
          h.minRate.min_rate.rate.rate_breakdown?.total_base_amount?.amount,
      ),
    ),
  );
  return limits;
};
