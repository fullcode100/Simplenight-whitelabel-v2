export type TransportationFilter = {
  minPrice: number;
  maxPrice: number;
  minPassengers: number;
  maxPassengers: number;
  carType: string[];
  sortBy: string;
  minRating: number;
  maxRating: number;
};

export type TransportationListMetaData =
  TransportationListPriceAndPassengersMetaData &
    TransportationListCarTypeMetaData;

export type TransportationListCarTypeMetaData = {
  carType: string[];
};

export type TransportationListPriceAndPassengersMetaData = {
  minPrice: number;
  maxPrice: number;
  minPassengers: number;
  maxPassengers: number;
  minRating: number;
  maxRating: number;
};
