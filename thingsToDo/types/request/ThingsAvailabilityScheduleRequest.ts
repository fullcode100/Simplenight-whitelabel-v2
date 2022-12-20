import { DateString } from 'types/global/DateString';

export interface ThingsAvailabilityScheduleRequest {
  inventory_id: string;
  start_date: DateString;
  end_date: DateString;
  apiUrl: string;
}
