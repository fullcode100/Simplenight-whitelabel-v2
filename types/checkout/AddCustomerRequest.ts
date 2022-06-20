export interface AddCustomerRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_prefix: string;
  country: string;
  extra_fields: {
    [key: string]: string;
  };
}
