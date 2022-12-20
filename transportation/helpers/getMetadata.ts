import { Quote } from "transportation/types/response/TransportationSearchResponse";

type filter = {
  minPrice: number
  maxPrice: number
  minPassengers: number
  maxPassengers: number
}

interface GetTransportationListMetadata {
  (transportationList: Quote[]): any;
}

export const getMetadata: GetTransportationListMetadata = (transportationList) => {
  const initialData: filter = {
    minPrice: transportationList[0]?.fare?.price || 0,
    maxPrice: 0,
    minPassengers: transportationList[0]?.service_info?.max_pax || 0,
    maxPassengers: 0,
  };

  const carTypesSet = new Set<string>();

  const priceMetaData = transportationList.reduce<filter>(
    (metaData, currentTransportation) => {
      const price = currentTransportation?.fare?.price || 0;
      const passengers = currentTransportation?.service_info?.max_pax || 0;
      const vehicle_type = currentTransportation?.service_info?.vehicle_type

      const carType = vehicle_type || '';
      carTypesSet.add(carType);
      return {
        ...metaData,
        minPrice: price < metaData.minPrice ? price : metaData.minPrice,
        maxPrice: price > metaData.maxPrice ? price : metaData.maxPrice,
        minPassengers: passengers < metaData.minPassengers ? passengers : metaData.minPassengers,
        maxPassengers: passengers > metaData.maxPassengers ? passengers : metaData.maxPassengers,
      };
    },
    initialData,
  );


  const carTypeMetaData = Array.from(carTypesSet).sort();

  return {
    ...priceMetaData,
    carTypeMetaData: carTypeMetaData,

  };
};
