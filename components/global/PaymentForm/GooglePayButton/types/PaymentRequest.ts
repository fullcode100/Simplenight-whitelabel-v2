export interface PaymentRequest {
  apiVersionMinor: number;
  apiVersion: number;
  paymentMethodData: PaymentMethodData;
}

export interface PaymentMethodData {
  description: string;
  tokenizationData: TokenizationData;
  type: string;
  info: Info;
}

export interface Info {
  cardNetwork: string;
  cardDetails: string;
  billingAddress: BillingAddress;
}

export interface BillingAddress {
  address1: string;
  address2: string;
  countryCode: string;
  state: string;
  city: string;
  postalCode: string;
}

export interface TokenizationData {
  type: string;
  token: string;
}
