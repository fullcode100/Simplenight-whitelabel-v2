export interface ProfileDetailsServerResponse {
  user: {
    id: number;
    organization_id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified: true;
    password: string;
    phone_number: string;
    phone_prefix: string;
    country: string;
    language: string;
    currency: string;
    distance: string;
  };
}
