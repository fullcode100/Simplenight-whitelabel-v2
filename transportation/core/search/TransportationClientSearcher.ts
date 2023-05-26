import { ClientSearcher } from 'core/client/ClientSearcher';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { TransportationSearchRequest } from '../../types/request/TransportationSearchRequest';
import { TransportationItem } from '../../types/response/TransportationSearchResponse';

export class TransportationClientSearcher extends ClientSearcher<
  TransportationSearchRequest,
  TransportationItem[],
  TransportationSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
