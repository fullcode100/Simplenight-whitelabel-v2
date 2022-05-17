import { Amount } from 'types/global/Amount';

export interface HotelSearchResponse {
  hotels: Hotel[];
  _timestamp: Date;
}
export interface Hotel {
  amount_min: Amount;
  details: Details;
  giata_code: string;
  id: string;
  photos: Photo[];
  relative_position: RelativePosition;
  rooms: Room[];
  thumbnail: string;
}

export interface Photo {
  text: string;
  url: string;
}

export interface Details {
  address: Address;
  chain: Chain;
  checkin_time: string;
  checkout_time: string;
  description: string;
  email: string;
  facilities: string[];
  name: string;
  phones: Phone[];
  star_rating: string;
  type: string;
  web: string;
}

export interface Address {
  coordinates: Coordinates;
  country_code: string;
  country: string;
  state: string;
  city: string;
  zone: string;
  district: string;
  address1: string;
  address2: string;
  postal_code: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Chain {
  chain_code: string;
  chain_name: string;
}

export interface Phone {
  phone_number: string;
  phone_type: string;
}

export interface RelativePosition {
  distance: number;
  distance_unit: string;
  near_to: NearTo[];
  distance_to_city_centre: number;
  distance_to_nearest_airport: number;
}

export interface NearTo {
  location_type: string;
  location_code: string;
  location_name: string;
  distance: string;
}

export interface Room {
  amenities: string[];
  capacity: Capacity;
  code: string;
  description: string;
  name: string;
  rates: Rates;
  room_type: string;
  services: Services;
}

export interface Services {
  double_beds: number;
  free_breakfast: boolean;
  free_parking: boolean;
  free_wifi: boolean;
  king_beds: number;
  other_beds: number;
  queen_beds: number;
  total_bathrooms: number;
  total_beds: number;
  total_rooms: number;
}

export interface Rates {
  avg_amount: Amount;
  min_rate: MinRate;
  upgrades: MinRate[];
}

export interface Rates {
  avg_amount: Amount;
  min_rate: MinRate;
  upgrades: MinRate[];
}

export interface MinRate {
  rate_type: MinRateRateType;
  meal_plan: MealPlan;
  sn_booking_code: string;
  booking_code_supplier: string;
  comments: string;
  requires_validation_before_booking: boolean;
  available_qty: number;
  rate: Rate;
  cancellation_policy?: CancellationPolicy;
}

export interface RateBreakdown {
  diff_min_rate: Amount;
  discounts: Discounts;
  extra_charges: Discounts;
  rate_type: string;
  taxes: Tax[];
  total_base_amount: Amount;
  total_taxes: Amount;
}

export interface Tax {
  description: string;
  included_in_total: boolean;
  tax_amount: Amount;
}

export interface Discounts {
  total_amount_before_apply: Amount;
  amount_to_apply: Amount;
}

export enum RateBreakdownRateType {
  SnPublic = 'SN_PUBLIC',
}

export enum MinRateRateType {
  SnPrivate = 'SN_PRIVATE',
}
export interface CancellationPolicy {
  cancellation_type: string;
  description: string;
}
export interface MealPlan {
  code: string;
  text: string;
}

export interface Rate {
  rate_breakdown: RateBreakdown;
  total_amount: Amount;
}

export interface Capacity {
  min_pax: number;
  max_pax: number;
  min_adults: number;
  max_adults: number;
  min_children: number;
  max_children: number;
}
