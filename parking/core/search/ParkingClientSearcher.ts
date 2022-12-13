import { ClientSearcher } from 'core/client/ClientSearcher';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ParkingSearchRequest } from '../../types/request/ParkingSearchRequest';
import { Parking } from '../../types/response/ParkingSearchResponse';

export class ParkingClientSearcher extends ClientSearcher<
  ParkingSearchRequest,
  Parking[],
  ParkingSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
