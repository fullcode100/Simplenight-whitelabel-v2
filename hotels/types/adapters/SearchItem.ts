import { Coordinates, Rates } from '../response/SearchResponse';
import { Amount } from '../../../types/global/Amount';

export interface SearchItem {
  id: string;
  accommodationType: string;
  amountMin: Amount;
  details: Details;
  minRate: Rates;
  thumbnail: string;
}

export interface Details {
  name: string;
  fullAddress: Address;
  starRating: string;
  sn_amenities?: string[];
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  state: string;
  countryCode: string;
  postalCode: string;
}
