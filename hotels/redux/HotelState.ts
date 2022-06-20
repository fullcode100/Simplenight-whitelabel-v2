import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { Hotel } from 'hotels/types/response/SearchResponse';

export interface HotelState {
  hotels: Hotel[];
  hotel: HotelDetailResponse | Hotel;
}
