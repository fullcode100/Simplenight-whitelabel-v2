import { Quote } from "transportation/types/response/TransportationSearchResponse";
import { TransportationListMetaData, TransportationListPriceAndPassengersMetaData } from "transportation/types/TransportationFilter";

interface GetTransportationListMetadata {
  (transportationList: Quote[]): TransportationListMetaData;
}

export const getMetadata: GetTransportationListMetadata = (transportationList) => {
  const initialData: TransportationListPriceAndPassengersMetaData = {
    minPrice: transportationList[0]?.fare?.price || 0,
    maxPrice: 0,
    minPassengers: transportationList[0]?.service_info?.max_pax || 0,
    maxPassengers: 0,
    minRating: 0,
    maxRating: 0
  };

  const carTypesSet = new Set<string>();

  const priceMetaData = transportationList.reduce<TransportationListPriceAndPassengersMetaData>(
    (metaData, currentTransportation) => {
      const price = currentTransportation?.fare?.price || 0;
      const passengers = currentTransportation?.service_info?.max_pax || 0;
      const vehicle_type = currentTransportation?.service_info?.vehicle_type;
      const rating = currentTransportation?.service_info?.passenger_reviews?.average_rating || 0;


      const carType = vehicle_type || '';
      carTypesSet.add(carType);
      return {
        ...metaData,
        minPrice: price < metaData.minPrice ? price : metaData.minPrice,
        maxPrice: price > metaData.maxPrice ? price : metaData.maxPrice,
        minPassengers: passengers < metaData.minPassengers ? passengers : metaData.minPassengers,
        maxPassengers: passengers > metaData.maxPassengers ? passengers : metaData.maxPassengers,
        minRating: rating < metaData.minRating ? rating : metaData.minRating,
        maxRating: rating > metaData.maxRating ? rating : metaData.maxRating
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
