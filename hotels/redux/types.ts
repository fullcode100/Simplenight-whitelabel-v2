import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { Hotel } from 'hotels/types/response/SearchResponse';

export enum HotelsActionTypes {
  FETCH_REQUEST = '@@hotels/FETCH_REQUEST',
  FETCH_SUCCESS = '@@hotels/FETCH_SUCCESS',
  FETCH_ERROR = '@@hotels/FETCH_ERROR',
}

export interface HotelState {
  loading: boolean;
  hotels: Hotel[];
  hotel: HotelDetailResponse | Hotel;
}
