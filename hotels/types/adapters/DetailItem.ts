import {
  Coordinates,
  CheckInInstructions,
  Room,
  Instruction,
  FeesInstructions,
} from '../response/SearchResponse';

export interface Photo {
  text: string;
  url: string;
}
export interface DetailItem {
  id: string;
  details: Details;
  rooms: Room[];
  photos: Photo[];
  nights?: number;
  checkInInstructions?: CheckInInstructions;
  roomsQty?: number;
}

export interface Details {
  name: string;
  fullAddress: Address;
  starRating: string;
  description: string;
  checkinTime: string;
  checkoutTime: string;
  checkInInstructions?: Instruction[];
  specialInstructions?: Instruction[];
  policies?: Instruction[];
  fees?: FeesInstructions;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  state: string;
  countryCode: string;
  postalCode: string;
  country: string;
}
