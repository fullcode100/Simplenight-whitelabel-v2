import { Parking } from '../types/response/ParkingSearchResponse';
import { useMemo, useState } from 'react';
import { ParkingSortBy } from '../types/ParkingFilter';

export const useSortParkingList = (parkingList: Parking[]) => {
  const [sortBy, setSortBy] = useState<ParkingSortBy>('distance');

  const sortedParkingList = useMemo(() => {
    return parkingList.sort((parking1, parking2) => {
      if (sortBy === 'distance') {
        const distance1 = parking1.properties.static.distance || 0;
        const distance2 = parking2.properties.static.distance || 0;

        if (distance1 < distance2) {
          return -1;
        } else if (distance1 > distance2) {
          return 1;
        } else return 0;
      } else {
        const price1 = parking1.properties.dynamic?.rates?.[0].price || 0;
        const price2 = parking2.properties.dynamic?.rates?.[0].price || 0;

        if (price1 < price2) {
          return -1;
        } else if (price1 > price2) {
          return 1;
        } else return 0;
      }
    });
  }, [sortBy, parkingList]);

  return {
    sortBy,
    setSortBy,
    sortedParkingList,
  };
};
