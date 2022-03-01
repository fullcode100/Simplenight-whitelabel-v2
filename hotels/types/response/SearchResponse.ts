export interface HotelSearchResponse {
  hotels: Hotel[];
  _timestamp: Date;
}

export interface Hotel {
  id: string;
  name: string;
  giata_code: null;
  description: string;
  thumbnail: string;
  geolocation: Geolocation;
  rooms: any[];
  amount_min: AmountM;
  amount_max: AmountM | null;
  supplier_prefix: string;
  supplier_id: string;
}

export interface AmountM {
  amount: number;
  str: string;
  currency: string;
}
