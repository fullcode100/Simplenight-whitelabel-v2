import { Amount } from 'types/global/Amount';

export type Restaurant = {
  name: string;
  categories: string[];
  id: string;
  display_phone: string;
  hours: Hour[];
  image: string;
  images: string[];
  is_closed: boolean;
  location: Location;
  phone: string;
  rating: number;
  review_count: number;
  reviews: Review[];
  openings: OpeningDate[];
  allows_reservation: boolean;
};

export type OpeningDate = {
  date: string;
  times: Times[];
};

export type Times = {
  credit_card_required: boolean;
  time: string;
};

export type Review = {
  rating: number;
  text: string;
  timestamp: string;
  user: {
    image: string;
    name: string;
  };
};

export type HourItem = {
  day: number;
  start: string;
  end: string;
  is_overnight: boolean;
};

export type Hour = {
  hours_type: string;
  is_open_now: boolean;
  open: HourItem[];
};

export type RatePrice = '$' | '$$' | '$$$' | '$$$$';

export interface DiningSearchResponse {
  items: Dining[];
  message: string;
}
export interface Dining extends Restaurant {
  id: string;
  name: string;
  image: string;
  images: string[];
  rating: number;
  review_count: number;
  price: RatePrice;
  categories: string[];
  location: Location;
  phone: string;
  allows_reservation: boolean;
  transactions: string[];
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Discounts {
  base_amount_before_apply: Amount;
  total_amount_before_apply: Amount;
  amount_to_apply: Amount;
  percentage_to_apply: string;
}

export interface AvgAmount {
  avg_amount: Amount;
  discounts: Discounts;
  markups: Discounts;
}

export interface Price {
  price: string | number;
  cancellation_policy?: CancellationPolicy;
}
export interface Tax {
  description: string;
  included_in_total: boolean;
  tax_amount: Amount;
  type: string;
  tax_original_amount: Amount;
}

export interface MealPlan {
  code: string;
  text: string;
}

export interface CancellationPolicy {
  cancellation_type?: string;
  description?: string;
  details?: CancellationDetails[];
}

export interface CancellationDetails {
  from_date: string;
  to_date: string;
  penalty_percentage: number;
  penalty_amount: Amount;
  cancellation_type: string;
}

export interface Discounts {
  base_amount_before_apply: Amount;
  total_amount_before_apply: Amount;
  amount_to_apply: Amount;
  percentage_to_apply: string;
}

export interface AvgAmount {
  avg_amount: Amount;
  discounts: Discounts;
  markups: Discounts;
}

export interface Price {
  price: string | number;
  cancellation_policy?: CancellationPolicy;
}
export interface Tax {
  description: string;
  included_in_total: boolean;
  tax_amount: Amount;
  type: string;
  tax_original_amount: Amount;
}

export interface MealPlan {
  code: string;
  text: string;
}

export enum MinRateType {
  SnPrivate = 'SN_PRIVATE',
}

export interface CancellationPolicy {
  cancellation_type?: string;
  description?: string;
  details?: CancellationDetails[];
}

export interface CancellationDetails {
  from_date: string;
  to_date: string;
  penalty_percentage: number;
  penalty_amount: Amount;
  cancellation_type: string;
}

export enum RateBreakdownRateType {
  SnPublic = 'SN_PUBLIC',
}

type OpenHours = { start: string; end: string };

export type WeekDaysAvailability = OpenHours[][];

export interface Coordinates {
  latitude: number;
  longitude: number;
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
