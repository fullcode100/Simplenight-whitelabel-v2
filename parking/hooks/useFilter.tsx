import { Parking } from '../types/response/ParkingSearchResponse';
import { useCallback, useMemo, useState } from 'react';
import { ParkingFilter, ParkingListMetaData } from '../types/ParkingFilter';
import { debounce } from 'lodash';

interface UseFilter {
  (list: Parking[], metadata: ParkingListMetaData): UseFilterReturnType;
}

interface UseFilterReturnType {
  filteredList: Parking[];
  filter: ParkingFilter;
  updateFilter: UpdateFilterFn;
}

type UpdateFilterFn = (partialFilter: Partial<ParkingFilter>) => void;

export const useFilter: UseFilter = (list, metadata) => {
  const [filter, setFilter] = useState<ParkingFilter>({
    parkingType: 'ALL',
    highAvailability: false,
    features: [],
    surfaceType: [],
    minPrice: metadata.minPrice,
    maxPrice: metadata.maxPrice,
    minHeight: 0,
    maxHeight:
      metadata.heightRestrictionsList[
        metadata.heightRestrictionsList.length - 1
      ],
    sortBy: 'distanceASC',
  });

  const parkingFilterFn = useCallback(
    (parking: Parking) => {
      let match = true;
      // Parking type filter
      if (filter.parkingType !== 'ALL') {
        match = parking.properties.static.type === filter.parkingType;
        if (!match) return false;
      }

      // High Availability
      if (filter.highAvailability) {
        const highAvailabilityItem =
          parking.properties.dynamic?.availability?.find(
            (availItem) => availItem.indicator === 'HIGH',
          );
        if (!highAvailabilityItem) return false;
      }

      // Surface Type
      if (filter.surfaceType.length > 0) {
        match = filter.surfaceType.includes(
          parking.properties.static.surface_type,
        );

        if (!match) return false;
      }

      // Features
      if (filter.features.length > 0) {
        const features = parking.properties.static.features;
        if (!features) return false;

        for (const feature of filter.features) {
          if (!features.includes(feature)) {
            return false;
          }
        }
      }

      const { minPrice, maxPrice, minHeight, maxHeight } = filter;
      const price = Math.max(
        parking.properties.dynamic?.rates?.[0].price || 0,
        0,
      );

      const heightRestriction = parking.properties.static.height?.max_cms || 0;

      if (price < minPrice || price > maxPrice) {
        return false;
      }

      return !(heightRestriction < minHeight || heightRestriction > maxHeight);
    },
    [
      filter.parkingType,
      filter.highAvailability,
      filter.surfaceType,
      filter.features,
      filter.minPrice,
      filter.maxPrice,
      filter.minHeight,
      filter.maxHeight,
    ],
  );

  const parkingSortFn = useCallback(
    (parking1: Parking, parking2: Parking) => {
      if (filter.sortBy === 'distanceASC') {
        const distance1 = parking1.properties.static.distance || 0;
        const distance2 = parking2.properties.static.distance || 0;

        if (distance1 < distance2) {
          return -1;
        } else if (distance1 > distance2) {
          return 1;
        } else return 0;
      } else if (filter.sortBy === 'distanceDESC') {
        const distance1 = parking1.properties.static.distance || 0;
        const distance2 = parking2.properties.static.distance || 0;

        if (distance1 < distance2) {
          return 1;
        } else if (distance1 > distance2) {
          return -1;
        } else return 0;
      } else if (filter.sortBy === 'priceASC') {
        const price1 = parking1.properties.dynamic?.rates?.[0].price || 0;
        const price2 = parking2.properties.dynamic?.rates?.[0].price || 0;

        if (price1 < price2) {
          return -1;
        } else if (price1 > price2) {
          return 1;
        } else return 0;
      } else {
        const price1 = parking1.properties.dynamic?.rates?.[0].price || 0;
        const price2 = parking2.properties.dynamic?.rates?.[0].price || 0;

        if (price1 < price2) {
          return 1;
        } else if (price1 > price2) {
          return -1;
        } else return 0;
      }
    },
    [filter.sortBy],
  );

  const filteredList = useMemo(() => {
    return list.filter(parkingFilterFn);
  }, [list, parkingFilterFn]);

  const sortedList = useMemo(() => {
    return filteredList.sort(parkingSortFn);
  }, [filteredList, parkingSortFn]);

  const updateFilter = debounce((partialFilter: Partial<ParkingFilter>) => {
    setFilter((current) => ({ ...current, ...partialFilter }));
  }, 0);

  return {
    filteredList: sortedList,
    filter,
    updateFilter,
  };
};
