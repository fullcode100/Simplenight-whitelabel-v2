import { DateString } from 'types/global/DateString';

export interface ThingsAvailabilityRequest {
  start_date: DateString;
  inventory_id: string;
  lang: string;
  currency: string;
  ticket_types: any;
  apiUrl: string;
}
