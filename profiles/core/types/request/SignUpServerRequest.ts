export interface SignUpServerRequest {
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  phone_number?: string;
  phone_prefix?: string;
  country?: string;
  language?: string;
  currency?: string;
  distance?: string;
}
