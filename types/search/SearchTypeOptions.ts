import { ClientDetailer } from 'core/client/ClientDetailer';
import { ClientSearcher } from 'core/client/ClientSearcher';
import { ServerDetailer } from 'core/server/ServerDetailer';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { ReactElement } from 'react';
import { SearchRequest } from './SearchRequest';

export type CategoryOptions = CategoryOption[];

export interface CoreOption {
  name: string;
  value: string;
  core?: CategoryCore<any>;
}

export interface CategoryOption {
  id: number;
  name: string;
  value: string;
  icon: ReactElement;
  selectedIcon: ReactElement;
  core: CategoryCore<any>;
  searchForm?: ReactElement;
  secondarySearchOptions?: ReactElement;
  readStateSearchForm?: ReactElement;
  resultsDisplay?: ReactElement;
  detailDisplay?: ReactElement;
  itineraryDisplay?: ReactElement;
  breakdownDisplay?: ReactElement;
  checkoutDisplay?: ReactElement;
  checkoutItemDisplay?: ReactElement;
  confirmationDisplay?: ReactElement;
  cancelledDisplay?: ReactElement;
  homeDisplay?: ReactElement;
  confirmationBreakdownDisplay?: ReactElement;
  filterOptions?: ReactElement;
}

export interface CategoryCore<SearchResponse> {
  urls: CategoryUrls;
  ClientSearcher: ClientSearcher<
    SearchRequest,
    SearchResponse,
    SearchRequest
  > | null;
  ServerSearcher: ServerSearcher<SearchResponse> | null;
  ClientDetailer: ClientDetailer<any, SearchResponse, any> | null;
  ServerDetailer: ServerDetailer<any> | null;
  ClientAvailability?: any | null;
  ServerAvailability?: any | null;
  ClientAvailabilitySchedule?: any | null;
  ServerAvailabilitySchedule?: any | null;
}

export interface CategoryUrls {
  search: CategoryUrl;
  detail: CategoryUrl;
  availability?: CategoryUrl;
  availabilitySchedule?: CategoryUrl;
}

export interface CategoryUrl {
  client: string;
  server: string;
}
