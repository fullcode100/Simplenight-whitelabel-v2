import { ClientDetailer } from 'core/client/ClientDetailer';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { TransportationDetailsRequest } from '../../types/request/TransportationDetailsRequest';
import { TransportationDetailsResponse } from '../../types/response/TransportationDetailsResponse';

export class TransportationClientDetailer extends ClientDetailer<
  TransportationDetailsRequest,
  TransportationDetailsResponse,
  TransportationDetailsRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
