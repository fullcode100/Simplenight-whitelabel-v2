import { BasicSearchFormData } from '../BasicSearchFormData';

export interface CarSearchFormData extends BasicSearchFormData {
  roomCount: number;
  adultCount: number;
  childCount: number;
}
