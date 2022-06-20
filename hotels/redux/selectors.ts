import { useAppSelector } from 'hooks/redux/useAppSelector';
import { HotelDetailResponse } from 'hotels/types/response/HotelDetailResponse';
import { HotelState } from './HotelState';

const select = (selector: (state: any) => any) => useAppSelector(selector);

export const getHotels = (state: HotelState) => state.hotels;

export const getHotelDetail = (): HotelDetailResponse =>
  select((state: any) => state.hotels.hotel);
