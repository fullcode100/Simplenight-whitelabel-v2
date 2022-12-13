import { ClientDetailer } from 'core/client/ClientDetailer';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ParkingDetailsRequest } from '../../types/request/ParkingDetailsRequest';
import { ParkingDetailsResponse } from '../../types/response/ParkingDetailsResponse';

export class ParkingClientDetailer extends ClientDetailer<
  ParkingDetailsRequest,
  ParkingDetailsResponse,
  ParkingDetailsRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
