import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { ShowsSearchRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';
import { i18n } from 'i18next';
import { AppThunk } from 'store';

export interface CategoryStoreActions {
  hotelsSetInitialState?: (
    searchParams: HotelSearchRequest,
    i18next: i18n,
  ) => AppThunk;

  showsAndEventsSetInitialState?: (
    searchParams: ShowsSearchRequest,
    i18next: i18n,
  ) => AppThunk;

  // search?: (searchParams: FlightSearchRequest | CarSearchRequest) => void;
  search?: (searchParams: any) => void;
  detail?: (id: any, params: any) => void;
}
