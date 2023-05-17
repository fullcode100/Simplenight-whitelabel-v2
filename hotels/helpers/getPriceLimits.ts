import { SearchItem } from 'hotels/types/adapters/SearchItem';
import { FilterCriteria } from '../hooks/useFilterHotels';

interface FilterCriteriaForPriceLimits {
  MaxRange: string;
  MinRange: string;
  keywordSearch: string;
}

type FilterFunction = (list: SearchItem[], value: any) => SearchItem[];

type FilterFunctionKeysForPriceLimits =
  keyof typeof criteriaFilterFunctionsForPriceLimits;

const criteriaFilterFunctionsForPriceLimits: {
  [key in keyof FilterCriteriaForPriceLimits]: FilterFunction;
} = {
  MinRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.starRating) >= Number(value)),
  MaxRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.starRating) <= Number(value)),
  keywordSearch: (list, value) =>
    list.filter((hotel) =>
      hotel.details.name.toUpperCase().match(value.toUpperCase()),
    ),
};

export const getPriceLimits = (hotels: SearchItem[]) => {
  const limits = [0, 5000];
  limits[0] = Math.floor(
    Math.min(...hotels.map((h) => h.minRate.avg_amount.avg_amount.amount)),
  );
  limits[1] = Math.ceil(
    Math.max(...hotels.map((h) => h.minRate.avg_amount.avg_amount.amount)),
  );
  return limits;
};
