export interface GetBookingRequest {
  id: string;
  snOrderNumber?: string;
  customerLastName?: string;
  apiUrl?: string;
}

export interface GetBookingsRequest {
  snOrderNumber: string;
  customerLastName: string;
}
