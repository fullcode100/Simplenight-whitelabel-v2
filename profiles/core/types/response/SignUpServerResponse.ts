export interface SignUpServerResponse {
  user: {
    id: string;
    organization_id: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified: boolean;
    phone_number: string;
    phone_prefix: string;
    country: string;
    language: string;
    currency: string;
    distance: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
  };
}
