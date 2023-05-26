import { TransportationItem } from 'transportation/types/response/TransportationSearchResponse';
import {
  TransportationListMetaData,
  TransportationListPriceAndPassengersMetaData,
} from 'transportation/types/TransportationFilter';

interface GetTransportationListMetadata {
  (transportationList: TransportationItem[]): TransportationListMetaData;
}

export const getMetadata: GetTransportationListMetadata = (
  transportationList,
) => {
  const initialData: TransportationListPriceAndPassengersMetaData = {
    minPrice: transportationList[0]?.rate?.total.full.amount || 0,
    maxPrice: 0,
    minPassengers: transportationList[0]?.extra_data?.max_capacity || 0,
    maxPassengers: 0,
    minRating: 0,
    maxRating: 0,
  };

  const carTypesSet = new Set<string>();

  const priceMetaData =
    transportationList.reduce<TransportationListPriceAndPassengersMetaData>(
      (metaData, currentTransportation) => {
        const price = currentTransportation?.rate?.total.full.amount || 0;
        const passengers = currentTransportation?.extra_data?.max_capacity || 0;
        const vehicleType = currentTransportation?.extra_data?.vehicle_type;
        const rating = currentTransportation?.extra_data?.avg_rating || 0;

        const carType = vehicleType || '';
        carTypesSet.add(carType);
        return {
          ...metaData,
          minPrice: price < metaData.minPrice ? price : metaData.minPrice,
          maxPrice: price > metaData.maxPrice ? price : metaData.maxPrice,
          minPassengers:
            passengers < metaData.minPassengers
              ? passengers
              : metaData.minPassengers,
          maxPassengers:
            passengers > metaData.maxPassengers
              ? passengers
              : metaData.maxPassengers,
          minRating: rating < metaData.minRating ? rating : metaData.minRating,
          maxRating: rating > metaData.maxRating ? rating : metaData.maxRating,
        };
      },
      initialData,
    );

  const carTypeMetaData = Array.from(carTypesSet).sort();

  return {
    ...priceMetaData,
    carType: carTypeMetaData,
  };
};
