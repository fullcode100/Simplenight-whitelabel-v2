import getFilterCountHotels from 'hotels/helpers/getFilterCountHotels';
import { SearchItem } from 'hotels/types/adapters/SearchItem';
import { useEffect, useState } from 'react';

export interface FilterCriteria {
  MaxPrice: string;
  MinPrice: string;
  MaxRange: string;
  MinRange: string;
  keywordSearch: string;
  sortCriteria?:
    | 'priceLowFirst'
    | 'priceHighFirst'
    | 'ratingLowFirst'
    | 'ratingHighFirst'
    | 'recommended';
}

type FilterFunction = (list: SearchItem[], value: any) => SearchItem[];

type FilterFunctionKeys = keyof typeof criteriaFilterFunctions;

const criteriaFilterFunctions: {
  [key in keyof FilterCriteria]: FilterFunction;
} = {
  MinPrice: (list, value) =>
    list.filter(
      (hotel) => hotel.minRate.avg_amount.avg_amount.amount >= Number(value),
    ),
  MaxPrice: (list, value) =>
    list.filter(
      (hotel) => hotel.minRate.avg_amount.avg_amount.amount <= Number(value),
    ),
  MinRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.starRating) >= Number(value)),
  MaxRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.starRating) <= Number(value)),
  keywordSearch: (list, value) =>
    list.filter((hotel) =>
      hotel.details.name.toUpperCase().match(value.toUpperCase()),
    ),
  sortCriteria: (list, value) => {
    switch (value) {
      case 'priceLowFirst':
        return list.sort(
          (a, b) =>
            a.minRate.avg_amount.avg_amount.amount -
            b.minRate.avg_amount.avg_amount.amount,
        );
      case 'priceHighFirst':
        return list.sort(
          (a, b) =>
            b.minRate.avg_amount.avg_amount.amount -
            a.minRate.avg_amount.avg_amount.amount,
        );
      case 'ratingHighFirst':
        return list.sort(
          (a, b) => Number(b.details.starRating) - Number(a.details.starRating),
        );
      case 'ratingLowFirst':
        return list.sort(
          (a, b) => Number(a.details.starRating) - Number(b.details.starRating),
        );
      case 'recommended':
        return list;
    }
    return list;
  },
};

export const useFilterHotels = (
  hotels: SearchItem[],
  criteria: FilterCriteria,
  setFiltersCount: any,
  limits: number[],
) => {
  const [filteredArray, setFilteredArray] = useState(hotels);

  useEffect(() => {
    let filtered = [...hotels];
    Object.entries(criteria).forEach(([key, value]) => {
      key = key || 'sortCriteria';
      if (criteriaFilterFunctions[key as FilterFunctionKeys]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        filtered = criteriaFilterFunctions[key as FilterFunctionKeys]!(
          filtered,
          value,
        );
      }
    });

    setFilteredArray(filtered);
    setFiltersCount(getFilterCountHotels(criteria, limits));
  }, [hotels, criteria]);

  return filteredArray;
};
