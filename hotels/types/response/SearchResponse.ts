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
  min_rate_room: Room;
  photos: Photo[];
  relative_position: RelativePosition;
  rooms: Room[];
  relevance?: number;
  thumbnail: string;
  nights?: number;
  guests?: number;
  roomsQty?: number;
  check_in_instructions?: CheckInInstructions;
  accommodation_type: string;
}

export interface InstructionItem {
  check_in_instructions?: Instruction[];
  special_instructions?: Instruction[];
  policies?: Instruction[];
  fees?: FeesInstructions;
}
export interface InstructionModalItem extends InstructionItem {
  checkin_time: string;
  checkout_time: string;
}
export interface CheckInInstructions {
  fees?: FeesInstructions;
  instructions?: string;
  policies?: string;
  special_instructions?: string;
}

export interface FeesInstructions {
  optional?: Instruction[];
  mandatory?: Instruction[];
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
  sn_amenities: string[];
  name: string;
  phones: Phone[];
  star_rating: string;
  type: string;
  web: string;
  check_in_instructions?: Instruction[];
  special_instructions?: Instruction[];
  policies?: Instruction[];
  fees?: FeesInstructions;
}

export interface Instruction {
  paragraph: string;
  list: string[];
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
  address3?: string;
  cross_streets?: string;
  zip_code?: string;
  display_address?: string[];
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
  photos?: Photo[];
  features?: string[];
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

export interface AvgAmount {
  avg_amount: Amount;
  discounts: Discounts;
  markups: Discounts;
}

export interface Rates {
  avg_amount: AvgAmount;
  min_rate: MinRate;
  upgrades: MinRate[];
}

export interface Rate {
  fees: string;
  taxes: Taxes;
  total: Total;
  discounts: Discounts;
  cancellation_policy: any[];
}

export interface Full {
  key: string;
  amount: Amount;
  description: string;
}

export interface TotalPostpaid {
  key: string;
  amount: Amount;
  description: string;
}

export interface Taxes {
  full: Full;
  prepaid: Full[];
  postpaid: any[];
  total_postpaid: TotalPostpaid;
}

export interface Net {
  amount: number;
  currency: string;
  formatted: string;
}

export interface Total {
  net: Net;
  full: Amount;
  prepaid: Amount;
  postpaid: Amount;
}

export interface Breakdown {
  amount: Amount;
  source: string;
  percentage: number;
  description: string;
}

export interface Discounts {
  breakdown: Breakdown[];
  amount_to_apply: Amount;
  percentage_to_apply: string;
  net_amount_before_apply?: any;
  base_amount_before_apply: Amount;
  total_amount_before_apply: Amount;
}

export interface MinRate {
  rate_type: MinRateRateType | RateBreakdownRateType;
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
  extra_charges?: Discounts;
  rate_type?: string;
  taxes: Tax[];
  total_base_amount: Amount;
  total_taxes: Amount;
  post_paid_rate?: PostPaidRate;
  markups?: Discounts;
}

export interface PostPaidRate {
  taxes: Tax[];
  total_taxes: Amount;
  total_amount: Amount;
}

export interface Tax {
  description: string;
  included_in_total: boolean;
  tax_amount: Amount;
  type: string;
  tax_original_amount: Amount;
}

export interface Discounts {
  base_amount_before_apply: Amount;
  total_amount_before_apply: Amount;
  amount_to_apply: Amount;
  percentage_to_apply: string;
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
  details?: CancellationDetails[];
}

export interface CancellationDetails {
  from_date: string;
  to_date: string;
  penalty_percentage: number;
  penalty_amount: Amount;
  cancellation_type: string;
}

export interface MealPlan {
  code: string;
  text: string;
}

export interface Rate {
  diff_min_rate: Amount;
  rate_breakdown: RateBreakdown;
  total_amount: Amount;
  starting_room_total: Amount;
}

export interface Capacity {
  min_pax: number;
  max_pax: number;
  min_adults: number;
  max_adults: number;
  min_children: number;
  max_children: number;
}
