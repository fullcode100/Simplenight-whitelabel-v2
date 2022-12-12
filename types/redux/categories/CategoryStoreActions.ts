import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import { i18n } from 'i18next';
import { AppThunk } from 'store';

export interface CategoryStoreActions {
  hotelsSetInitialState: (
    searchParams: HotelSearchRequest,
    i18next: i18n,
  ) => AppThunk;
}
