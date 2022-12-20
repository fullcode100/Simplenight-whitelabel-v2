export interface TransportationSearchResponse {
  echo_request: EchoRequest
  status_code: number
  data: TransportationSearchResponseItemResult
  total_qty: number
  timestamp: string
}

export interface EchoRequest {
  pickup_datetime: string
  pickup_context: string
  pickup_location: string
  return_context: string
  return_location: string
  currency: string
  include_return_trip: string
  passenger_count: string
  from_description: string
  to_description: string
  rsp_fields_set: string
  inventory_ids: string
  correlation_id: string
  user_ip: string
  user_agent: string
}

export interface TransportationSearchResponseItemResult {
  items: Item[]
}

export interface Item {
  response: Response
}

export interface Response {
  quote_request: QuoteRequest
  quote_request_datetime_utc: string
  quote_request_id: string
  quote_request_url: string
  results: Results
  message: any
  status: string
}

export interface QuoteRequest {
  flight: Flight
  from_location: FromLocation
  include_return_trip: boolean
  passenger: Passenger
  to_location: ToLocation
  metadata: any
}

export interface Flight {
  departure_datetime_local: any
  landing_datetime_local: any
}

export interface FromLocation {
  description: string
  lat: number
  lng: number
  type: string
}

export interface Passenger {
  count: number
}

export interface ToLocation {
  description: string
  lat: number
  lng: number
  type: string
}

export interface Results {
  quotes: Quote[]
}

export interface Quote {
  book_url: string
  expire_datetime_utc: string
  fare: Fare
  luggage: Luggage
  quote_id: string
  quote_url: string
  service_info: ServiceInfo
  status: string
}

export interface Fare {
  currency_code: string
  price: number
  refund_cancellation_policy: string
  type: string
  refund_policies: RefundPolicy[]
}

export interface RefundPolicy {
  minute_prior: number
  percent: number
  method: string
}

export interface Luggage {
  inclusive_allowance: string
}

export interface ServiceInfo {
  description: any
  passenger_reviews: PassengerReviews
  photo_url: string
  photo_urls: string[]
  vehicle_type: string
  service_class: string
  min_pax: number
  max_pax: number
  supplier: Supplier
  type: string
}

export interface PassengerReviews {
  average_rating: number
  count: number
}

export interface Supplier {
  description: string
  id: string
  name: string
  photo_url: string
}
