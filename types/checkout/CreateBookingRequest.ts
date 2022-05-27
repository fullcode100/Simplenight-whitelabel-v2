export interface PaymentInformation {
  payment_method: string;
  payment_token: string;
  billing_address: {
    country: string;
    address2?: string;
    address3?: string;
    city?: string;
    province?: string;
    postal_code?: string;
  };
}

export interface CreateBookingRequest {
  cart_id: string;
  payment_request: PaymentInformation;
}
