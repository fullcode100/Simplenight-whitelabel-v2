export interface ThingsDetailResponse {
  items: ThingsDetailItem[];
}

export interface ThingsDetailItem {
  id: string;
  name: string;
  supplier: string;
  address: Address;
  thumbnail: string;
  rate: RateDetail;
  main_category: string;
  cancellation_policy: CancellationPolicy;
  categories: Category[];
  extra_data: ExtraData;
}

export interface Category {
  id: string;
  label: string;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  coordinates: Coordinates;
  country: string;
  state?: string;
  area?: string;
  city: string;
}

export interface Total {
  amount: number;
  formatted: string;
  currency: string;
}

export interface RateDetail {
  discounts: Discounts;
  fees: AmountDetail;
  taxes: AmountDetail;
  total: AmountDetail;
}

export interface Discounts {
  amount_to_apply: Amount;
  breakdown: Breakdown;
  net_amount_before_apply: Amount;
  percentage_to_apply: string;
  total_amount_before_apply: Amount;
}

export interface Breakdown {
  amount: Amount;
  description: string;
  percentage: number;
  source: string;
}

export interface AmountDetail {
  full: Amount;
  net: Amount;
  postpaid: Amount;
  prepaid: Amount;
}

export interface Amount {
  amount: number;
  formatted: string;
  currency: string;
}

export interface CancellationPolicy {
  cancellation_type: string;
}

export interface Amount {
  amount: number;
  currency: string;
  formatted: string;
}

export interface Detail {
  cancellation_type: string;
  from_date: string;
  to_date: string;
  penalty_amount: Amount;
  penalty_percentage: number;
}

export interface Flag {
  flag_id: string;
  description: string;
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
  avg_amount: Amount;
  taxes: any[];
  total_taxes: Amount;
  total_amount: Amount;
  recommended_amount: Amount;
}

export interface TicketType {
  id: string;
  label: string;
  available_qty: number;
  cancellation_policy: CancellationPolicy2;
  rate: Rate;
}

export interface Grouping {
  type: string;
  description: string;
}

export interface Presentation {
  label: string;
  id: string;
}

export interface AddressExtended {
  address1: string;
  address2: string;
  city: string;
  state: string;
  country_code: string;
  country: string;
  postal_code: string;
}

export interface Location {
  ref: string;
  provider: string;
  name?: string;
  description?: string;
  address?: AddressExtended;
  coordinates?: Coordinates;
}

export interface LocationDetail {
  location: Location;
  pickup_type: string;
}

export interface LocationPoints {
  allow_custom_location: boolean;
  options: string[];
  description: string;
  locations: LocationDetail[];
  minutes_before_departure?: number;
}

export interface BookingConfirmationSettings {
  confirmation_type: string;
  cut_off_in_minutes?: number;
  cut_off_type?: string;
}

export interface Ticket {
  booking_code_supplier: string;
  description: string;
  duration: number;
  full_day: boolean;
  name: string;
  code: string;
  start_date: string;
  start_time?: string;
  ticket_types: TicketType[];
  grouping: Grouping;
  presentation: Presentation;
  lang_guides: LangGuide[];
  pickup: LocationPoints;
  safety_measures: string[];
  min_travellers: number;
  max_travellers: number;
  is_adult_required: boolean;
  rate: RateDetail;
  booking_confirmation_settings: BookingConfirmationSettings;
  times: TimeObject[];
}

export interface AnswerOption {
  answer: string;
  related_question_ids?: string[];
}
export interface ExtraData {
  amenities: string[];
  avg_rating: number;
  booking_confirmation_settings: BookingConfirmationSettings;
  booking_questions: BookingQuestion[];
  end_location?: Location[];
  excludes: IncludeExclude[];
  includes: IncludeExclude[];
  grouping: Grouping;
  is_adult_required: boolean;
  lang_guides: LangGuide[];
  max_travelers: number;
  min_travelers: number;
  presentation: Presentation[];
  redemption: Redemption;
  review_amount: number;
  safety_measures: string[];
  images: string[];
  tickets: Ticket[];
  description: string;
  duration?: number;
  min_duration?: number;
  max_duration?: number;
  full_day: boolean;
  start_date: string;
  start_time?: string;
  pickup: LocationPoints;
  start_locations?: Location[];
  pricing: Pricing;
}

export interface BookingQuestion {
  id: string;
  label: string;
  hint: string;
  is_required: boolean;
  grouping: string;
  answer_type: string;
  answer_max_length: number;
  answer_options: AnswerOption[];
  is_conditional: boolean;
  answer_units: string[];
}
export interface Redemption {
  instructions: string;
  locations: any[];
  redemption_type: string;
}

export interface LangGuide {
  lang_code: string;
  language: string;
}

export interface IncludeExclude {
  category: string;
  category_description: string;
  description: string;
}

export interface BookingQuestion {
  answer_max_length: number;
  answer_type: string;
  grouping: string;
  hint: string;
  id: string;
  is_conditional: boolean;
  is_required: boolean;
  label: string;
  answer_options: AnswerOption[];
}

export interface Pricing {
  type: string;
  ticket_types: PricingTicketType[];
}

export interface PricingTicketType {
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
  [key: string]: number;
}

export interface TimeObject {
  start_time: string;
  available: boolean;
}
