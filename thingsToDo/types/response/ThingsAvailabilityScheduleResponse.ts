export interface ThingsAvailabilityScheduleResponse {
  tickets: ThingsScheduleDetail[];
}

export interface ThingsScheduleDetail {
  date: string;
  status: string;
}
