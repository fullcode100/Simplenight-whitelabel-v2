import { ClientSearcher } from 'core/client/ClientSearcher';
import { DiningSearchRequest } from 'dining/types/request/DiningSearchRequest';
import { DiningSearchResponse } from 'dining/types/response/SearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class DiningClientSearcher extends ClientSearcher<
  DiningSearchRequest,
  DiningSearchResponse,
  DiningSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
