import { SearchItem } from 'hotels/types/adapters/SearchItem';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';

export enum HotelsActionTypes {
  FETCH_REQUEST = '@@hotels/FETCH_REQUEST',
  FETCH_SUCCESS = '@@hotels/FETCH_SUCCESS',
  FETCH_ERROR = '@@hotels/FETCH_ERROR',
}

export interface HotelState {
  loading: boolean;
  hotels: SearchItem[];
  hotel: HotelDetailResponse | SearchItem;
}
