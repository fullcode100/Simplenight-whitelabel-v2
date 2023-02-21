import { SearchItem } from 'hotels/types/adapters/SearchItem';
import { useEffect, useState } from 'react';

export interface FilterCriteria {
  MaxPrice: string;
  MinPrice: string;
  MaxRange: string;
  MinRange: string;
  freeCancelation: boolean;
  property:
    | 'propertyHotel'
    | 'propertyRental'
    | 'propertyHotel&Rental'
    | 'propertyAll';
  hotelName: string;
  sortCriteria?:
    | 'priceLowFirst'
    | 'priceHighFirst'
    | 'ratingLowFirst'
    | 'ratingHighFirst';
}

type FilterFunction = (list: SearchItem[], value: any) => SearchItem[];

type FilterFunctionKeys = keyof typeof criteriaFilterFunctions;

const criteriaFilterFunctions: {
  [key in keyof FilterCriteria]: FilterFunction;
} = {
  MinPrice: (list, value) =>
    list.filter((hotel) => hotel.amountMin.amount >= Number(value)),
  MaxPrice: (list, value) =>
    list.filter((hotel) => hotel.amountMin.amount <= Number(value)),
  MinRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.starRating) >= Number(value)),
  MaxRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.starRating) <= Number(value)),
  freeCancelation: (list, value) =>
    value
      ? list.filter(
          (hotel) =>
            hotel.minRate.min_rate.cancellation_policy?.cancellation_type ===
            'FREE_CANCELLATION',
        )
      : list,
  property: (list, value) => {
    switch (value) {
      case 'propertyRental':
        return list.filter(
          (hotel) => hotel.accommodationType === 'VACATION_RENTALS',
        );
      case 'propertyHotel':
        return list.filter((hotel) => hotel.accommodationType === 'HOTELS');
      case 'propertyHotel&Rental':
        return list.filter(
          (hotel) =>
            hotel.accommodationType === 'VACATION_RENTALS' ||
            hotel.accommodationType === 'HOTELS',
        );
    }
    return list;
  },
  hotelName: (list, value) =>
    list.filter((hotel) =>
      hotel.details.name.toUpperCase().match(value.toUpperCase()),
    ),
  sortCriteria: (list, value) => {
    switch (value) {
      case 'priceLowFirst':
        return list.sort((a, b) => a.amountMin.amount - b.amountMin.amount);
      case 'priceHighFirst':
        return list.sort((a, b) => b.amountMin.amount - a.amountMin.amount);
      case 'ratingHighFirst':
        return list.sort(
          (a, b) => Number(b.details.starRating) - Number(a.details.starRating),
        );
      case 'ratingLowFirst':
        return list.sort(
          (a, b) => Number(a.details.starRating) - Number(b.details.starRating),
        );
    }
    return list;
  },
};

export const useFilterHotels = (
  hotels: SearchItem[],
  criteria: FilterCriteria,
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
  }, [hotels, criteria]);

  return filteredArray;
};
