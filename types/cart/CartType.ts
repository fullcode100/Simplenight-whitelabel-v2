export interface CartResponse {
  cart: CartObjectResponse;
}

export interface CartObjectResponse {
  cart_id: string;
  status: string;
  lang: string;
  currency: string;
  sandbox_mode: boolean;
  organization_id: string;
  created_at: string;
  last_update_at: string;
  items: Item[];
  total_item_qty: number;
  total_amount: TotalAmount;
  total_amount_post_paid: TotalAmount;
}

export interface TotalAmount {
  amount: number;
  formatted: string;
  currency: string;
}

export interface NewCartRequest {
  url: string;
  cart: {
    currency?: string;
    items: Item[];
  };
}

export interface UpdateCartRequest {
  url: string;
  cart: Item;
}

export interface Item {
  inventory_id: string;
  sn_booking_code: string;
  quantity?: number;
  supplier?: string;
  category?: string;
  customer_additional_requests?: string;
  customer?: Customer;
  extended_data?: ExtendedData;
}

export interface Customer {
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_prefix: string;
  email: string;
  country: string;
  extra_fields: ExtraFields;
}

export interface ExtendedData {
  extended_1: string;
  extended_2: string;
}

export interface ExtraFields {
  extra1: string;
  extra2: string;
}
