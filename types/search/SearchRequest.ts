import { StringGeolocation } from './Geolocation';

export interface SearchRequest {
  start_date?: string;
  end_date?: string;
  dst_geolocation?: StringGeolocation;
  rsp_fields_set?: string;
  sort?: string;
  seats?: string;
  radius?: string;
  cancellation_type?: string;
  min_price?: string;
  max_price?: string;
  is_total_price?: string;
  supplier_ids?: string;
  apiUrl?: string;
  is_trending_req?: boolean;
  query?: string;
  relation_id?: string;
}
