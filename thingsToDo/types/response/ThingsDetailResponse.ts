export interface ThingsDetailResponse {
  items: ThingsDetailItem[];
}

export interface ThingsDetailItem {
  id: string;
  name: string;
  supplier: string;
  address: Address;
  thumbnail: string;
  rates: Rates;
  cancellation_policy: CancellationPolicy;
  extra_data: ExtraData;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  coordinates: Coordinates;
  country: string;
  state: string;
  city: string;
}

export interface Total {
  amount: number;
  formatted: string;
  currency: string;
}

export interface Rates {
  total: Total;
}

export interface CancellationPolicy {
  cancellation_type: string;
}

export interface PenaltyAmount {
  amount: number;
  currency: string;
  formatted: string;
}

export interface Detail {
  cancellation_type: string;
  from_date: Date;
  to_date: Date;
  penalty_amount: PenaltyAmount;
  penalty_percentage: number;
}

export interface Flag {
  flag_id: string;
  value: boolean;
}

export interface CancellationPolicy2 {
  cancellation_type: string;
  details: Detail[];
  description: string;
  flags: Flag[];
}

export interface AvgAmount {
  amount: number;
  currency: string;
  formatted: string;
}

export interface TotalTaxes {
  amount: number;
  currency: string;
  formatted: string;
}

export interface TotalAmount {
  amount: number;
  currency: string;
  formatted: string;
}

export interface Rate {
  rate_type: string;
  avg_amount: AvgAmount;
  taxes: any[];
  total_taxes: TotalTaxes;
  total_amount: TotalAmount;
}

export interface TicketType {
  id: string;
  label: string;
  start_age: number;
  end_age: number;
  available_qty: number;
  cancellation_policy: CancellationPolicy2;
  rate: Rate;
  min_travelers: number;
  max_travelers: number;
}

export interface Grouping {
  type: string;
  description: string;
}

export interface Presentation {
  methods: string[];
  description: string;
}

export interface LangGuide {
  type: string;
  lang: string;
}

export interface Address2 {
  address1: string;
  address2: string;
  city: string;
  state: string;
  country_code: string;
  country: string;
  postal_code: string;
}

export interface Coordinates2 {
  latitude: number;
  longitude: number;
}

export interface Location2 {
  ref: string;
  provider: string;
  name: string;
  address: Address2;
  coordinates: Coordinates2;
}

export interface Location {
  location: Location2;
  pickup_type: string;
}

export interface Pickup {
  allow_custom_location: boolean;
  options: string[];
  description: string;
  locations: Location[];
}

export interface BookingConfirmationSettings {
  confirmation_type: string;
}

export interface Ticket {
  name: string;
  description: string;
  duration: number;
  start_date: string;
  start_time: string;
  includes: string[];
  excludes: string[];
  full_day: boolean;
  ticket_types: TicketType[];
  grouping: Grouping;
  presentation: Presentation;
  booking_code_supplier: string;
  lang_guides: LangGuide[];
  pickup: Pickup;
  safety_measures: string[];
  min_travellers: number;
  max_travellers: number;
  is_adult_required: boolean;
  booking_confirmation_settings: BookingConfirmationSettings;
}

export interface ExtraData {
  avg_rating: number;
  review_amount: number;
  images: string[];
  tickets: Ticket[];
  description: string;
  duration: number;
  full_day: boolean;
  start_date: string;
  pricing: Pricing;
}

export interface Pricing {
  type: string;
  ticket_types: PricingTicketType[];
  unit_type: string;
}

export interface PricingTicketType {
  id: any;
  ticket_type_id: string;
  start_age: number;
  end_age: number;
  min_travelers: number;
  max_travelers: number;
  label: string;
}

export interface TimeItem {
  starting: string;
  available: boolean;
}
export interface GuestsData {
  adults: number;
  children: number;
  infants: number;
}
