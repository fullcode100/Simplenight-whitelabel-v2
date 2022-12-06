export interface ParkingDetailsRequest {
  rsp_fields_set: 'extended';
  inventory_ids: string;
  start_date: string;
  end_date: string;
  currency?: string;
}
