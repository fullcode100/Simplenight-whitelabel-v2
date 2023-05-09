export interface PaymentInformation {
  payment_method?: string;
  payment_token?: string;
  name_on_card?: string;
  credit_card_number?: string;
  cvv?: string;
  expiry_date?: string;
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
  expedia_prod?: boolean;
  session_id?: string;
  refferal: string;
  apiUrl?: string;
}
