// export interface CarDetailResponse {
//   car_id: string;
//   start_date: Date;
//   end_date: Date;
//   car_details: CarDetails;
//   occupancy: Occupancy;
//   giata_code: string;
//   room_types: RoomType[];
//   avg_nightly_rate: number;
//   avg_nightly_base: number;
//   avg_nightly_tax: number;
//   error: null;
// }

import { CarSearchResponse2 } from './SearchResponse';

export type CarDetailResponse = CarSearchResponse2;

export interface CarDetails {
  name: string;
  address: Address;
  car_code: string;
  checkin_time: null;
  checkout_time: null;
  photos: Photo[];
  amenities: string[];
  thumbnail_url: string;
  geolocation: Geolocation;
  phone_number: null;
  email: null;
  homepage_url: null;
  chain_code: string;
  chain_name: string;
  star_rating: number;
  review_rating: null;
  property_description: string;
}

export interface Address {
  city: string;
  province: string;
  country: string;
  address1: string;
  address2: null;
  address3: null;
  postal_code: string;
}

export interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface Photo {
  url: string;
  type: Type;
  display_order: number;
}

export enum Type {
  Room = 'Room',
}

export interface Occupancy {
  adults: string;
  children: string;
  rooms?: string;
  children_ages?: string | null;
}

export interface RoomType {
  code: string;
  name: string;
  description: string;
  amenities: any[];
  photos: Photo[];
  capacity: Occupancy;
  bed_types: null;
  cancellation_policy: CancellationPolicy;
  room_rate: RoomRate;
  daily_rates: null;
  unstructured_policies: null;
  postpaid_fees: null;
}

export interface CancellationPolicy {
  summary: string;
  cancellation_deadline: Date;
  unstructured_policy: string;
}

export interface RoomRate {
  code: string;
  room_type_code: string;
  rate_plan_code: string;
  maximum_allowed_occupancy: Occupancy;
  total_base_rate: AvgNightlyRate;
  total_tax_rate: AvgNightlyRate;
  total: AvgNightlyRate;
  rate_type: string;
  discount: Discount;
  daily_rates: null;
  postpaid_fees: null;
  partner_data: null;
  markup_applicable: boolean;
  all_inclusive: boolean;
  inventory_type: null;
  avg_nightly_rate: AvgNightlyRate;
}

export interface AvgNightlyRate {
  amount: number;
  currency: Currency;
}

export enum Currency {
  Usd = 'USD',
}

export interface Discount {
  total_before_discount: AvgNightlyRate;
  total_discounted: AvgNightlyRate;
  discount_percentage: number;
}
