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

export const getPriceLimits = (
  hotels: SearchItem[],
  criteria: FilterCriteria,
) => {
  let filteredForPriceLimits = [...hotels];
  Object.entries(criteria).forEach(([key, value]) => {
    key = key || 'sortCriteria';
    const filterFunction =
      criteriaFilterFunctionsForPriceLimits[
        key as FilterFunctionKeysForPriceLimits
      ];
    if (filterFunction) {
      if ((key as string) !== 'MinPrice' && (key as string) !== 'MaxPrice') {
        filteredForPriceLimits = filterFunction(filteredForPriceLimits, value);
      }
    }
  });
  const limits = [0, 5000];
  const priceArray: number[] = [];
  if (filteredForPriceLimits.length > 0) {
    filteredForPriceLimits.forEach((item) =>
      priceArray.push(item.minRate.avg_amount.avg_amount.amount),
    );
    limits[0] = Math.floor(Math.min(...priceArray));
    limits[1] = Math.ceil(Math.max(...priceArray));
  }
  return limits;
};
