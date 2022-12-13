import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { FlightSearchRequest } from 'flights/types/request/FlightSearchRequest';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import { i18n } from 'i18next';
import { AppThunk } from 'store';

export interface CategoryStoreActions {
  hotelsSetInitialState?: (
    searchParams: HotelSearchRequest,
    i18next: i18n,
  ) => AppThunk;

  search?: (searchParams: FlightSearchRequest | CarSearchRequest) => void;
  detail?: (id: any, params: any) => void;
}
