import { Hotel } from 'hotels/types/response/SearchResponse';
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

type FilterFunction = (list: Hotel[], value: any) => Hotel[];

type FilterFunctionKeys = keyof typeof criteriaFilterFunctions;

const criteriaFilterFunctions: {
  [key in keyof FilterCriteria]: FilterFunction;
} = {
  MinPrice: (list, value) =>
    list.filter((hotel) => hotel.amount_min.amount >= Number(value)),
  MaxPrice: (list, value) =>
    list.filter((hotel) => hotel.amount_min.amount <= Number(value)),
  MinRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.star_rating) >= Number(value)),
  MaxRange: (list, value) =>
    list.filter((hotel) => Number(hotel.details.star_rating) <= Number(value)),
  freeCancelation: (list, value) =>
    value
      ? list.filter(
          (hotel) =>
            hotel.min_rate_room.rates.min_rate.cancellation_policy
              ?.cancellation_type === 'FREE_CANCELLATION',
        )
      : list,
  property: (list, value) => {
    switch (value) {
      case 'propertyRental':
        return list.filter(
          (hotel) => hotel.accommodation_type === 'VACATION_RENTALS',
        );
      case 'propertyHotel':
        return list.filter((hotel) => hotel.accommodation_type === 'HOTELS');
      case 'propertyHotel&Rental':
        return list.filter(
          (hotel) =>
            hotel.accommodation_type === 'VACATION_RENTALS' ||
            hotel.accommodation_type === 'HOTELS',
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
        return list.sort((a, b) => a.amount_min.amount - b.amount_min.amount);
      case 'priceHighFirst':
        return list.sort((a, b) => b.amount_min.amount - a.amount_min.amount);
      case 'ratingHighFirst':
        return list.sort(
          (a, b) =>
            Number(b.details.star_rating) - Number(a.details.star_rating),
        );
      case 'ratingLowFirst':
        return list.sort(
          (a, b) =>
            Number(a.details.star_rating) - Number(b.details.star_rating),
        );
    }
    return list;
  },
};

export const useFilterHotels = (hotels: Hotel[], criteria: FilterCriteria) => {
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
