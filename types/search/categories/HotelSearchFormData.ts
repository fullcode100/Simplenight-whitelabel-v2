import { BasicSearchFormData } from '../BasicSearchFormData';

export interface HotelSearchFormData extends BasicSearchFormData {
  roomCount: number;
  adultCount: number;
  childCount: number;
}
