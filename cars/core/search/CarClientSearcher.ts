import { ClientSearcher } from 'core/client/ClientSearcher';
import { CarSearchRequest } from 'cars/types/request/CarSearchRequest';
import { CarSearchResponse2 } from 'cars/types/response/SearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class CarClientSearcher extends ClientSearcher<
  CarSearchRequest,
  CarSearchResponse2,
  CarSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
