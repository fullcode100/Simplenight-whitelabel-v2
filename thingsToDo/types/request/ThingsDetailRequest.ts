import { DateString } from 'types/global/DateString';

export interface ThingsDetailPreRequest {
  example: string;
}

export interface ThingsDetailRequest {
  start_date: DateString;
  end_date: DateString;
  rsp_fields_set: string;
}
