export interface DeleteBookingItemRequest {
  bookingId: string;
  itemId: string;
}

export interface CancelBookingRequest {
  bookingId: string;
  apiUrl?: string;
}
