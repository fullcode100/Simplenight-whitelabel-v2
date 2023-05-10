import { DateString } from 'types/global/DateString';

export interface DiningDetailPreRequest {
  id: string;
  start_date: string;
  covers: number;
  time: string;
}

export interface DiningDetailRequest {
  id: string;
}
