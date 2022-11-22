import {
  CheckInInstructions,
  Details,
  Hotel,
  Photo,
  Rates,
  RelativePosition,
  Room,
} from 'hotels/types/response/SearchResponse';
import { ThingsCartRequestDetail } from 'thingsToDo/types/request/ThingsCartRequest';
import { ThingsCartItemData } from 'thingsToDo/types/response/ThingsCartItemData';
import { Amount } from 'types/global/Amount';

export interface CartResponse {
  cart?: CartObjectResponse[];
  item?: Item;
}

export interface CartSchemaResponse {
  form_schema: any;
}
export interface CartServerResponse {
  carts?: CartObjectResponse[];
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
  sandbox_mode: boolean;
  status: string;
  total_amount: TotalAmount;
  total_amount_post_paid: TotalAmount;
  total_amount_taxes: TotalAmount;
  total_amount_taxes_postpaid: TotalAmount;
  total_item_qty: number;
}

export interface TotalAmount {
  amount: number;
  formatted: string;
  currency: string;
}

export interface CartItemRequest {
  booking_data?: ThingsCartRequestDetail;
  category?: string;
  sn_booking_code?: string;
}

export interface NewCartRequest {
  url: string;
  cart: {
    items: CartItemRequest[];
  };
}

export interface UpdateCartItemRequest {
  url: string;
  cart: CartItemRequest;
}

export interface Item {
  booking_data?: ThingsCartRequestDetail;
  cart_id?: string;
  cart_item_id?: string;
  category?: string;
  created_at?: string;
  customer?: Customer;
  extended_data?: HotelCart;
  inventory_id?: string;
  inventory_name?: string;
  last_validated_rate?: any;
  item_data?: ThingsCartItemData;
  quantity?: number;
  rate?: Rates;
  sn_booking_code?: string;
  status?: string;
  supplier?: string;
  thumbnail_url?: string;
  nights?: number;
  guests?: number;
  adults?: number;
  children?: number;
  room_qty?: number;
}

export interface Customer {
  id?: number;
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  phone_prefix: string;
  extra_fields?: ExtraFields;
}

export interface ExtraFields {
  extra1?: string;
  extra2?: string;
  lang: string;
  extra_1: number;
  extra_2: number;
}

export interface UpdateCartRequest {
  lang?: string;
  currency?: string;
}

export interface HotelCart {
  amount_min?: Amount;
  details?: Details;
  end_date?: string;
  giata_code?: string;
  id?: string;
  min_rate_room?: Room;
  photos?: Photo[];
  relative_position?: RelativePosition;
  items?: Item[];
  rooms?: Room[];
  relevance?: number;
  start_date?: string;
  thumbnail?: string;
  terms_and_conditions?: string;
  check_in_instructions?: CheckInInstructions;
  selected_room_code?: string;
}
