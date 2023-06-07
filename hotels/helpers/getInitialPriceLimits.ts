import { SearchItem } from 'hotels/types/adapters/SearchItem';

export const getInitialPriceLimits = (hotels: SearchItem[]) => {
  const limits = [0, 5000];
  limits[0] = Math.floor(
    Math.min(...hotels.map((h) => h.minRate.avg_amount.avg_amount.amount)),
  );
  limits[1] = Math.ceil(
    Math.max(...hotels.map((h) => h.minRate.avg_amount.avg_amount.amount)),
  );
  return limits;
};
