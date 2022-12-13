import {
  ParkingListMetaData,
  ParkingListPriceMetaData,
} from '../types/ParkingFilter';
import { Parking } from '../types/response/ParkingSearchResponse';
import { useMemo } from 'react';

interface UseParkingMetaData {
  (parkingList: Parking[]): ParkingListMetaData;
}

export const useParkingMetaData: UseParkingMetaData = (parkingList) => {
  return useMemo(() => {
    const currencyInfo = parkingList[0]?.properties.static.rate_tables;
    const initialData: ParkingListPriceMetaData = {
      minPrice: 0,
      maxPrice: 0,
      currency: currencyInfo?.currency_code || 'USD',
      currencySymbol: currencyInfo?.currency,
    };

    const heightRestrictionSet = new Set<number>();

    const priceMetaData = parkingList.reduce<ParkingListPriceMetaData>(
      (metaData, currentParking) => {
        const price = currentParking.properties.dynamic?.rates?.[0].price || 0;
        const isLessThanZero = price < 0;

        const heightRestrictions =
          currentParking.properties.static.height?.max_cms || 0;
        heightRestrictionSet.add(heightRestrictions);

        if (isLessThanZero) return metaData;
        return {
          ...metaData,
          minPrice: price < metaData.minPrice ? price : metaData.minPrice,
          maxPrice: price > metaData.maxPrice ? price : metaData.maxPrice,
        };
      },
      initialData,
    );

    const heightRestrictionsMetaData = Array.from(heightRestrictionSet).sort();
    return {
      ...priceMetaData,
      heightRestrictionsList: heightRestrictionsMetaData,
    };
  }, [parkingList]);
};
