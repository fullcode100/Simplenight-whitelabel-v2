export interface ShowsSearchResponse {
  id: string;
  name: string;
  address: {
    country_code: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    postal_code: string;
    relative_position: {
      distance: number;
      distance_unit: string;
    };
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  extra_data: {
    venue_name: string;
    seats: [];
    starts_at: string;
    description: string;
    seat_map: string;
    images: [];
  };
  phone_number: string;
  reviews: {
    amount: number;
    rating: number;
  };
  fromDate: string;
  toDate: string;
  images: string[];
  thumbnail: string;
  rate: {
    total: {
      net: {
        formatted: number;
        currency: string;
      };
      amount: number;
      formatted: string;
      currency: string;
    };
    discount_percentage: string;
    total_amount_before_discount: {
      amount: number;
      formatted: string;
      currency: string;
    };
  };
  tags: string;
  cancellation_policy: {
    description: string;
    details: [
      {
        from_date: string;
        to_date: string;
        penalty_percentage: number;
        penalty_amount: {
          amount: number;
          formatted: string;
          currency: string;
        };
        cancellation_type: string;
      },
    ];
    cancellation_type: string;
  };
}