import { Parking } from '../types/response/ParkingSearchResponse';
import { ParkingFilter } from '../types/ParkingFilter';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from './useDebounce';

interface UseParkingListFilter {
  (list: Parking[]): UseParkingListFilterReturnType;
}

interface UseParkingListFilterReturnType {
  filteredParkingList: Parking[];
  filter: ParkingFilter;
  changeFilter: (partialFilter: Partial<ParkingFilter>) => void;
  isFiltering: boolean;
}

export const useParkingListFilter: UseParkingListFilter = (list) => {
  const [isFiltering, setIsFiltering] = useState(true);
  const [filter, setFilter] = useState<ParkingFilter>({
    parkingType: 'ALL',
    highAvailability: false,
    minPrice: 0,
    minHeight: 0,
    maxPrice: 0,
    maxHeight: 0,
    surfaceType: [],
    features: [],
  });

  const debouncedFilter = useDebounce(filter, 1000);

  const filterFn = useCallback(
    (parking: Parking) => {
      let match = true;

      // Parking type filter
      if (debouncedFilter.parkingType !== 'ALL') {
        match = parking.properties.static.type === debouncedFilter.parkingType;
        if (!match) return false;
      }

      // High Availability
      if (debouncedFilter.highAvailability) {
        const highAvailabilityItem =
          parking.properties.dynamic?.availability?.find(
            (availItem) => availItem.indicator === 'HIGH',
          );
        if (!highAvailabilityItem) return false;
      }

      // Surface Type
      if (debouncedFilter.surfaceType.length > 0) {
        match = debouncedFilter.surfaceType.includes(
          parking.properties.static.surface_type,
        );

        if (!match) return false;
      }

      // Features
      if (debouncedFilter.features.length > 0) {
        const features = parking.properties.static.features;
        if (!features) return false;

        for (const feature of debouncedFilter.features) {
          if (!features.includes(feature)) {
            return false;
          }
        }
      }

      const { minPrice, maxPrice, minHeight, maxHeight } = debouncedFilter;
      const price = parking.properties.dynamic?.rates?.[0].price || 0;
      const heightRestriction = parking.properties.static.height?.max_cms || 0;

      if (price < minPrice || price > maxPrice) {
        return false;
      }

      return !(heightRestriction < minHeight || heightRestriction > maxHeight);
    },
    [
      debouncedFilter.parkingType,
      debouncedFilter.highAvailability,
      debouncedFilter.surfaceType,
      debouncedFilter.features,
      debouncedFilter.minPrice,
      debouncedFilter.maxPrice,
      debouncedFilter.minHeight,
      debouncedFilter.maxHeight,
    ],
  );

  const filteredParkingList = useMemo(
    () => list.filter(filterFn),
    [list, filterFn],
  );

  const changeFilter: UseParkingListFilterReturnType['changeFilter'] = (
    partialFilter,
  ) => {
    setFilter((prevFilter) => ({ ...prevFilter, ...partialFilter }));
  };

  useEffect(() => {
    setIsFiltering(true);
  }, [filter]);

  useEffect(() => {
    setIsFiltering(false);
  }, [filteredParkingList]);

  return {
    filter,
    changeFilter,
    filteredParkingList,
    isFiltering,
  };
};
