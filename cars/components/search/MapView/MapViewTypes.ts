import { Car } from 'cars/types/response/SearchResponse';
import { Amount } from 'types/global/Amount';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export interface addressProps {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address1: string;
  country_code: string;
  postal_code: string;
}

export interface detailsProps {
  address: addressProps;
  name: string;
  star_rating: number;
}

export interface itemsProps {
  details: detailsProps;
  thumbnail: string;
  id: string;
  amount_min: Amount;
}

export interface MapViewProps {
  CarCategory: CategoryOption;
  items: Car[];
  createUrl: (item: Car) => string;
}
