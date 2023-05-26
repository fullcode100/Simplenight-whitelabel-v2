import { TransportationItem } from './TransportationSearchResponse';

export interface TransportationDetailsResponse {
  items: TransportationDetailsResponseItem[];
}

interface TransportationDetailsResponseItem {
  result: TransportationDetailsResponseItemResult;
}

export interface TransportationDetailsResponseItemResult {
  features: [TransportationItem];
}
