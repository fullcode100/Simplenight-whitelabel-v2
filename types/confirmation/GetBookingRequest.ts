export interface GetBookingRequest {
  id: string;
  snOrderNumber?: string;
  customerLastName?: string;
}

export interface GetBookingsRequest {
  snOrderNumber: string;
  customerLastName: string;
}
