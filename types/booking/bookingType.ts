export interface Booking {
  booking_id: string;
  created_at: string;
  customer_last_name: string;
  items: Item[];
  manual_charge_status: string;
  order_total: OrderTotal;
  order_total_postpaid: OrderTotal;
  partner_url: string;
  payments: PaymentElement[];
  payments_total: OrderTotal;
  primary_contact: PrimaryContact;
  supplier_total: OrderTotal;
  refunds: any[];
  refunds_total: OrderTotal;
  sandbox_mode: boolean;
  sn_order_number: string;
  status: string;
  tax_total: OrderTotal;
  tax_total_postpaid: OrderTotal;
  updated_at: string;
}

export interface Item {
  booking_id: string;
  booking_item_id: string;
  error_data: ErrorData;
  extra_data: ItemExtraData;
  inventory_id: string;
  name: string;
  payment_type_status: string;
  product_order_number: string;
  quantity: string;
  status: string;
  supplier: string;
  supplier_order_number: string;
  total: OrderTotal;
  total_postpaid: OrderTotal;
  total_supplier: OrderTotal;
  total_tax: OrderTotal;
  total_tax_postpaid: OrderTotal;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ErrorData {}

export interface ItemExtraData {
  id: string;
  rooms: Room[];
  photos: Photo[];
  details: Details;
  end_date: string;
  relevance: number;
  thumbnail: string;
  amount_min: AmountMin;
  giata_code: string;
  start_date: string;
  supplier_id: string;
  min_rate_room: Room;
  supplier_prefix: string;
  relative_position: RelativePosition;
}

export interface AmountMin {
  _amount: string;
  _currency: Currency;
  _language: Language;
  _debug_data: any[] | null;
}

export interface Currency {
  format: string;
  symbol: string;
  decimals: number;
  iso_code: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
}

export interface Details {
  web: string;
  name: string;
  type: string;
  chain: Chain;
  email: string;
  phones: Phone[];
  address: Address;
  facilities: string[];
  description: string;
  star_rating: string;
  checkin_time: string;
  checkout_time: string;
}

export interface Address {
  city: string;
  zone: string;
  state: string;
  country: string;
  address1: string;
  address2: string;
  district: string;
  coordinates: Coordinates;
  postal_code: string;
  country_code: string;
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
  phone_type: string;
  phone_number: string;
}

export interface Room {
  code: string;
  name: string;
  rates: Rates;
  photos: Photo[];
  capacity: Capacity;
  services: Services;
  amenities: string[];
  room_type: string;
  description: string;
}

export interface Capacity {
  max_pax: number;
  min_pax: number;
  max_adults: number;
  min_adults: number;
  max_children: number;
  min_children: number;
}

export interface Photo {
  url: string;
  text: string;
}

export interface Rates {
  min_rate: MinRate;
  all_room_rates: MinRate[];
  all_room_rates_sorted: MinRate[];
}

export interface MinRate {
  rate: Rate;
  comments: string;
  meal_plan: MealPlan;
  rate_type: string;
  available_qty: number;
  sn_booking_code: string;
  cancellation_policy: ErrorData;
  booking_code_supplier: string;
  requires_validation_before_booking: boolean;
}

export interface MealPlan {
  code: string;
  text: string;
}

export interface Rate {
  rate_breakdown: RateBreakdown;
  suggested_retail_total_amount: null;
}

export interface RateBreakdown {
  markups: null;
  discounts: null;
  rate_type: string;
  daily_rates: null;
  total_taxes: AmountMin;
  total_amount: AmountMin;
  extra_charges: null;
  total_post_paid_amount: AmountMin;
}

export interface Services {
  free_wifi: boolean;
  king_beds: number;
  other_beds: number;
  queen_beds: number;
  total_beds: number;
  double_beds: number;
  total_rooms: number;
  free_parking: boolean;
  free_breakfast: boolean;
  total_bathrooms: number;
}

export interface RelativePosition {
  near_to: NearTo[];
  distance: number;
  distance_unit: string;
  distance_to_city_centre: number;
  distance_to_nearest_airport: number;
}

export interface NearTo {
  distance: string;
  location_code: string;
  location_name: string;
  location_type: string;
}

export interface OrderTotal {
  amount: number;
  formatted: string;
  currency: string;
}

export interface PaymentElement {
  supplier: string;
  transaction_amount: OrderTotal;
  transaction_status: string;
  supplier_charge_id: string;
  transaction_type: string;
  transaction_time: string;
  payment_token: string;
  card_brand: string;
  last_four: string;
  payment_source_type: string;
  extra_data: PaymentExtraData;
}

export interface PaymentExtraData {
  payment: ExtraDataPayment;
}

export interface ExtraDataPayment {
  id: string;
  status: string;
  order_id: string;
  created_at: string;
  updated_at: string;
  location_id: string;
  source_type: string;
  total_money: Money;
  amount_money: Money;
  capabilities: string[];
  card_details: CardDetails;
  delay_action: string;
  delayed_until: string;
  version_token: string;
  approved_money: Money;
  delay_duration: string;
  receipt_number: string;
  application_details: ApplicationDetails;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface ApplicationDetails {
  application_id: string;
  square_product: string;
}

export interface CardDetails {
  card: Card;
  status: string;
  avs_status: string;
  cvv_status: string;
  entry_method: string;
  card_payment_timeline: CardPaymentTimeline;
  statement_description: string;
}

export interface Card {
  bin: string;
  last_4: string;
  exp_year: number;
  card_type: string;
  exp_month: number;
  card_brand: string;
  fingerprint: string;
  prepaid_type: string;
}

export interface CardPaymentTimeline {
  authorized_at: string;
}

export interface PrimaryContact {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_prefix: string;
  email: string;
  country: string;
  extra_fields: ExtraFields;
}

export interface ExtraFields {
  extra_1: number;
  extra_2: number;
}
