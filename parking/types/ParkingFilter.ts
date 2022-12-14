export type ParkingFilter = {
  parkingType: string;
  highAvailability: boolean;
  surfaceType: string[];
  features: string[];
  minPrice: number;
  maxPrice: number;
  minHeight: number;
  maxHeight: number;
  sortBy: ParkingSortBy;
};

export type ParkingListMetaData = ParkingListPriceMetaData &
  ParkingListHeightRestrictionsMetaData;

export type ParkingListHeightRestrictionsMetaData = {
  heightRestrictionsList: number[];
};

export type ParkingListPriceMetaData = {
  minPrice: number;
  maxPrice: number;
  currency: string;
  currencySymbol?: string;
};

export type ParkingSortBy = 'distance' | 'price';
