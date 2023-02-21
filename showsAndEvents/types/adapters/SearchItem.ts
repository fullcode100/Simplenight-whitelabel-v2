import { Rate } from 'types/cart/CartType';

export interface SearchItem {
  id: string;
  name: string;
  address: Address;
  cancellationType: string;
  extraData: ExtraData;
  rate: Rate;
  thumbnail: string;
}

export interface Address {
  country_code: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  postal_code: string;
  relative_position: {
    distance: number;
    distance_unit: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface CancellationPolicy {
  cancellation_type: string;
}

export interface ExtraData {
  ticket_count: number;
  venue_name: string;
  seats: [];
  starts_at: string;
  description: string;
  seat_map: string;
  images: [];
  relation_id: string;
}
