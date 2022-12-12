import { Parking } from './ParkingSearchResponse';

export interface ParkingDetailsResponse {
  items: ParkingDetailsResponseItem[];
}

interface ParkingDetailsResponseItem {
  result: ParkingDetailsResponseItemResult;
}

export interface ParkingDetailsResponseItemResult {
  features: [Parking];
}
