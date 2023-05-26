import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';
import {
  TransportationFilter,
  TransportationListMetaData,
} from 'transportation/types/TransportationFilter';

interface UseFilter {
  (
    transportationList: TransportationItem[],
    metadata: TransportationListMetaData,
  ): UseFilterReturnType;
}

interface UseFilterReturnType {
  filteredList: TransportationItem[];
  onFilterValuesChanged: UpdateFilterFn;
  filter: TransportationFilter;
}

type UpdateFilterFn = (filterValues: Partial<TransportationFilter>) => void;

export const useFilter: UseFilter = (transportationList, metadata) => {
  const [filter, setFilter] = useState<TransportationFilter>({
    sortBy: 'sortByPriceAsc',
    minPrice: metadata.minPrice,
    maxPrice: metadata.maxPrice,
    minPassengers: metadata.minPassengers,
    maxPassengers: metadata.maxPassengers,
    carType: metadata.carType,
    minRating: metadata.maxRating,
    maxRating: metadata.maxRating,
  });

  const transportationFilterFn = useCallback(
    (transportation: TransportationItem) => {
      let match = true;
      if (filter.carType.length > 0) {
        match = filter.carType.includes(transportation.extra_data.vehicle_type);

        if (!match) return false;
      }
      const {
        minPrice,
        maxPrice,
        minPassengers,
        maxPassengers,
        minRating,
        maxRating,
      } = filter;
      const price = Math.max(transportation?.rate?.total?.full.amount || 0, 0);
      const passenger = Math.max(
        transportation?.extra_data?.max_capacity || 0,
        0,
      );
      const rating = Math.max(transportation?.extra_data?.avg_rating || 0, 0);

      if (price < minPrice || price > maxPrice) {
        return false;
      }

      if (rating < minRating || rating > maxRating) {
        return false;
      }
      return !(passenger < minPassengers || passenger > maxPassengers);
    },
    [
      filter.minPrice,
      filter.maxPrice,
      filter.minPassengers,
      filter.maxPassengers,
      filter.carType,
      filter.minRating,
      filter.maxRating,
    ],
  );

  const transportationSortFn = useCallback(
    (quote1: TransportationItem, quote2: TransportationItem) => {
      if (filter.sortBy === 'sortByPriceAsc') {
        const price1 = quote1?.rate?.total?.full.amount || 0;
        const price2 = quote2?.rate?.total?.full.amount || 0;

        if (price1 < price2) {
          return -1;
        } else if (price1 > price2) {
          return 1;
        } else return 0;
      } else if (filter.sortBy === 'sortByPriceDesc') {
        const price1 = quote1?.rate?.total?.full.amount || 0;
        const price2 = quote2?.rate?.total?.full.amount || 0;

        if (price1 > price2) {
          return -1;
        } else if (price1 < price2) {
          return 1;
        } else return 0;
      } else if (filter.sortBy === 'sortByRatingAsc') {
        const rate1 = quote1?.extra_data?.avg_rating || 0;
        const rate2 = quote2?.extra_data?.avg_rating || 0;

        if (rate1 < rate2) {
          return -1;
        } else if (rate1 > rate2) {
          return 1;
        } else return 0;
      } else {
        const rate1 = quote1?.extra_data?.avg_rating || 0;
        const rate2 = quote2?.extra_data?.avg_rating || 0;

        if (rate1 > rate2) {
          return -1;
        } else if (rate1 < rate2) {
          return 1;
        } else return 0;
      }
    },
    [filter.sortBy],
  );

  const filteredList = useMemo(() => {
    return transportationList.filter(transportationFilterFn);
  }, [transportationList, transportationFilterFn]);

  const sortedList = useMemo(() => {
    return filteredList.sort(transportationSortFn);
  }, [filteredList, transportationSortFn]);

  const onFilterValuesChanged = debounce(
    (partialFilter: Partial<TransportationFilter>) => {
      setFilter((current) => ({ ...current, ...partialFilter }));
    },
    0,
  );

  return {
    filteredList: sortedList,
    onFilterValuesChanged,
    filter,
  };
};
