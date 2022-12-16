import {
  CheckInInstructions,
  Details,
  Hotel,
  Photo,
  Rates,
  RelativePosition,
  Room,
} from 'hotels/types/response/SearchResponse';
import { ShowsCartRequestDetail } from 'showsAndEvents/types/request/ShowsCartRequest';
import { ShowsCartItemData } from 'showsAndEvents/types/response/ShowsCartResponse';
import { ThingsCartRequestDetail } from 'thingsToDo/types/request/ThingsCartRequest';
import { ThingsCartItemData } from 'thingsToDo/types/response/ThingsCartItemData';
import { Amount } from 'types/global/Amount';
import { FlightCartRequestDetail } from 'flights/types/request/FlightCartRequest';
import { FlightCartItemData } from 'flights/types/response/FlightCartItemData';
import { CarCartRequestDetail } from 'cars/types/request/CarCartRequest';
import { CarCartItemData } from 'cars/types/response/CarCartItemData';

export interface CartBookingData {
  [key: string]: any;
}
export interface CartItemData {
  [key: string]: any;
}

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
  booking_data?: CartBookingData;
  category?: string;
  sn_booking_code?: string;
}

export interface NewCartRequest {
  url: string;
  cart: {
    items: Item[];
  };
}

export interface UpdateCartItemRequest {
  url: string;
  cart: Item;
}

export interface Breakdown {
  amount: Amount;
  description: string;
  percentage: number;
  source: string;
}
export interface Discounts {
  amount_to_apply: Amount;
  breakdown: Breakdown[];
  total_amount_before_apply: Amount;
  net_amount_before_apply: Amount;
  percentage_to_apply: string;
}

export interface Rate {
  discounts: Discounts;
  taxes: {
    full: Partial<Amount>;
    postpaid: Amount[];
    prepaid: Amount[];
    total_postpaid: Partial<Amount>;
  };
  total: {
    full: Amount;
    net: Amount;
    postpaid: Amount;
    prepaid: Amount;
  };
}
export interface ItemData extends ThingsCartItemData, ShowsCartItemData {
  rate: Rate;
}

export interface Item {
  category?: string;
  sector?: string;
  booking_data?: CartBookingData;
  item_data?: CartItemData;
  cart_id?: string;
  cart_item_id?: string;
  created_at?: string;
  customer?: Customer;
  extended_data?: HotelCart;
  inventory_id?: string;
  inventory_name?: string;
  last_validated_rate?: any;
  quantity?: number;
  rate?: Rates & Rate;
  sn_booking_code?: string;
  status?: string;
  supplier?: string;
  thumbnail_url?: string;
  nights?: number;
  guests?: number;
  adults?: number;
  children?: number;
  infants?: number;
  room_qty?: number;
  customer_additional_requests?: string;
  supplier_order_number?: string;
  vendor_confirmation_code?: string;
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

export interface FlightCart {
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
}

export interface CarCart {
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
