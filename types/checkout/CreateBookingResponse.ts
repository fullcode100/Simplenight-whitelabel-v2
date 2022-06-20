import { Amount } from 'types/global/Amount';

export interface CreateBookingResponse {
  booking: Booking;
}

export interface Booking {
  booking_id: string;
  customer_last_name: string;
  items_booking: ItemsBooking[];
  manual_charge_status: string;
  order_total: Amount;
  order_total_postpaid: Amount;
  payments: PaymentElement[];
  payments_total: Amount;
  primary_contact: PrimaryContact;
  refunds: any[];
  sandbox_mode: boolean;
  sn_order_number: string;
  status: string;
  tax_total: any[];
  tax_total_postpaid: any[];
  updated_at: Date;
}

export interface ItemsBooking {
  applied_discounts: any[];
  applied_markups: any[];
  cancellation_policy: CancellationPolicy;
  extended_description: string;
  extra_data: ItemsBookingExtraData;
  inventory_id: string;
  name: string;
  payment_type_status: string;
  product_order_number: string;
  quantity: string;
  status: string;
  supplier: string;
  supplier_order_number: string;
  total: Amount;
  total_postpaid: Amount;
  total_supplier: Amount;
  total_tax: Amount;
  total_tax_postpaid: Amount;
}

export interface CancellationPolicy {
  description: string;
  details: Detail[];
  cancellation_type: string;
}

export interface Detail {
  from_date: Date;
  to_date: Date;
  penalty_percentage: number;
  penalty_amount: Amount;
  cancellation_type: string;
}

export interface ItemsBookingExtraData {
  result: Result;
}

export interface Result {
  reference: string;
  clientReference: string;
  creationDate: Date;
  status: string;
  modificationPolicies: ModificationPolicies;
  creationUser: string;
  holder: Holder;
  hotel: BookedHotel;
  invoiceCompany: InvoiceCompany;
  totalNet: number;
  pendingAmount: number;
  currency: string;
}

export interface Holder {
  name: string;
  surname: string;
}

export interface BookedHotel {
  checkOut: Date;
  checkIn: Date;
  code: number;
  name: string;
  categoryCode: string;
  categoryName: string;
  destinationCode: string;
  destinationName: string;
  zoneCode: number;
  zoneName: string;
  latitude: string;
  longitude: string;
  rooms: BookedRoom[];
  totalNet: string;
  currency: string;
  supplier: Supplier;
}

export interface BookedRoom {
  status: string;
  id: number;
  code: string;
  name: string;
  paxes: Pax[];
  rates: Rate[];
}

export interface Pax {
  roomId: number;
  type: string;
}

export interface Rate {
  rateClass: string;
  net: string;
  rateComments: string;
  paymentType: string;
  packaging: boolean;
  boardCode: string;
  boardName: string;
  cancellationPolicies: CancellationPolicyElement[];
  taxes: Taxes;
  rooms: number;
  adults: number;
  children: number;
}

export interface CancellationPolicyElement {
  amount: string;
  from: Date;
}

export interface Taxes {
  taxes: Tax[];
  allIncluded: boolean;
}

export interface Tax {
  included: boolean;
  amount: string;
  currency: string;
  type: string;
  clientAmount: string;
  clientCurrency: string;
}

export interface Supplier {
  name: string;
  vatNumber: string;
}

export interface InvoiceCompany {
  code: string;
  company: string;
  registrationNumber: string;
}

export interface ModificationPolicies {
  cancellation: boolean;
  modification: boolean;
}

export interface PaymentElement {
  supplier: string;
  transaction_amount: Amount;
  transaction_status: string;
  supplier_charge_id: string;
  transaction_type: string;
  transaction_time: Date;
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
  amount_money: Amount;
  application_details: ApplicationDetails;
  approved_money: Amount;
  capabilities: string[];
  card_details: CardDetails;
  created_at: Date;
  delay_action: string;
  delay_duration: string;
  delayed_until: Date;
  id: string;
  location_id: string;
  order_id: string;
  receipt_number: string;
  source_type: string;
  status: string;
  total_money: Amount;
  updated_at: Date;
  version_token: string;
}

export interface ApplicationDetails {
  application_id: string;
  square_product: string;
}

export interface CardDetails {
  avs_status: string;
  card: Card;
  card_payment_timeline: CardPaymentTimeline;
  cvv_status: string;
  entry_method: string;
  statement_description: string;
  status: string;
}

export interface Card {
  bin: string;
  card_brand: string;
  card_type: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  last_4: string;
  prepaid_type: string;
}

export interface CardPaymentTimeline {
  authorized_at: Date;
}

export interface PrimaryContact {
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_prefix: string;
  email: string;
  country: string;
}
