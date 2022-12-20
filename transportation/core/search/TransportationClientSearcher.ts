import { ClientSearcher } from 'core/client/ClientSearcher';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { TransportationSearchRequest } from '../../types/request/TransportationSearchRequest';
import { Quote } from '../../types/response/TransportationSearchResponse';

export class TransportationClientSearcher extends ClientSearcher<
TransportationSearchRequest,
Quote[],
  TransportationSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
