import { Hotel, Rates } from 'hotels/types/response/SearchResponse';

export interface CartResponse {
  cart?: CartObjectResponse[];
  item?: Item;
}

export interface CartSchemaResponse {
  form_schema: any;
}
export interface CartServerResponse {
  cart?: CartObjectResponse[];
  item?: Item;
}

export interface CartClientResponse {
  cart?: CartObjectResponse;
  item?: Item;
}

export interface CartObjectResponse {
  cart_id: string;
  created_at: string;
  currency: string;
  customer: Customer;
  items: Item[];
  lang: string;
  last_update_at: string;
  organization_id: number;
  sandbox_mode: boolean;
  status: string;
  total_amount: TotalAmount;
  total_item_qty: number;
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

export interface UpdateCartItemRequest {
  url: string;
  cart: Item;
}

export interface Item {
  cart_id?: string;
  cart_item_id?: string;
  category?: string;
  created_at?: string;
  customer?: Customer;
  extended_data?: Hotel;
  inventory_id: string;
  inventory_name?: string;
  last_validated_rate?: any;
  quantity?: number;
  rate?: Rates;
  sn_booking_code: string;
  supplier?: string;
  thumbnail_url?: string;
}

export interface Customer {
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_prefix: string;
}

export interface ExtraFields {
  extra1: string;
  extra2: string;
}

export interface UpdateCartRequest {
  lang?: string;
  currency?: string;
}
