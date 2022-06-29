import {
  Capacity,
  Details,
  MealPlan,
  Photo,
  RateBreakdown,
  RelativePosition,
  Services,
} from 'hotels/types/response/SearchResponse';
import { CancellationPolicy } from 'types/checkout/CreateBookingResponse';
import { Amount } from 'types/global/Amount';

export interface Booking {
  booking_id: string;
  created_at: string;
  customer_last_name: string;
  items: Item[];
  manual_charge_status: string;
  order_total: Amount;
  order_total_postpaid: Amount;
  partner_url: string;
  payments: Payment[];
  payments_total: Amount;
  primary_contact: PrimaryContact;
  supplier_total: Amount;
  refunds: any[];
  refunds_total: Amount;
  sandbox_mode: boolean;
  sn_order_number: string;
  status: string;
  tax_total: Amount;
  tax_total_postpaid: Amount;
  updated_at: string;
  sub_total: Amount;
}

export interface Item {
  adults: number;
  booking_id: string;
  booking_item_id: string;
  cancellation_policy: CancellationPolicy;
  children: number;
  extra_data: ItemExtraData;
  inventory_id: string;
  name: string;
  payment_type_status: string;
  product_order_number: string;
  quantity: string;
  room_qty: number;
  status: string;
  supplier: string;
  supplier_order_number: string;
  total: Amount;
  total_postpaid: Amount;
  total_supplier: Amount;
  total_tax: Amount;
  total_tax_postpaid: Amount;
}

export interface ItemExtraData {
  id: string;
  rooms: Room[];
  items?: Item[];
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

export interface Rates {
  min_rate: MinRate;
  all_room_rates: MinRate[];
  all_room_rates_sorted: MinRate[];
}

export interface MinRate {
  available_qty: number;
  booking_code_supplier: string;
  cancellation_policy: CancellationPolicy;
  comments: string;
  meal_plan: MealPlan;
  rate: Rate;
  rate_type: string;
  requires_validation_before_booking: boolean;
  sn_booking_code: string;
}

export interface Rate {
  diff_min_rate: Amount;
  rate_breakdown: RateBreakdown;
  suggested_retail_total_amount: null;
  total_amount: Amount;
}

export interface Payment {
  supplier: string;
  transaction_amount: Amount;
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
