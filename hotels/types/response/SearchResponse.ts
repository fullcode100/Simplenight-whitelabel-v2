import { Amount } from 'types/global/Amount';

export interface HotelSearchResponse {
  hotels: Hotel[];
  _timestamp: Date;
}
export interface Hotel {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  rooms: Room[];
  amount_min: Amount;
  relative_position: RelativePosition;
  address: Address;
  type: string;
  star_rating: string;
  web: string;
  email: string;
  phones: Phone[];
  checkin_time: string;
  checkout_time: string;
  facilities: string[];
  amenities: any[];
  chain: Chain;
  supplier_prefix: string;
  supplier_id: string;
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
  radius: number;
  unit: string;
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
  code: string;
  room_type: string;
  description: string;
  name: string;
  capacity: Capacity;
  rates: Rates;
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
  booking_code_sn: string;
  booking_code_supplier: string;
  comments: string;
  requires_validation_before_booking: boolean;
  available_qty: number;
  rate: Rate;
}

export interface RateBreakdown {
  diff_min_rate: Amount;
  discounts: Discounts;
  rate_type: RateBreakdownRateType;
  taxes: any[];
  total_base_amount: Amount;
  total_taxes: Amount;
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

export interface MealPlan {
  code: Code;
  text: Text;
}

export enum Code {
  Ab = 'AB',
  Ro = 'RO',
}

export enum Text {
  AmericanBreakfast = 'AMERICAN BREAKFAST',
  RoomOnly = 'ROOM ONLY',
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
