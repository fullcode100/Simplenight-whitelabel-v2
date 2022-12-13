import { BasicSearchFormData } from '../BasicSearchFormData';

export interface FlightSearchFormData extends BasicSearchFormData {
  roomCount: number;
  adultCount: number;
  childCount: number;
}
