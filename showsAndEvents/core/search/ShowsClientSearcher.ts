import { ClientSearcher } from 'core/client/ClientSearcher';
import { ShowsSearchRequest } from 'showsAndEvents/types/request/ShowsSearchRequest';
import { ShowsSearchResponse } from 'showsAndEvents/types/response/ShowsSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ShowsClientSearcher extends ClientSearcher<
  ShowsSearchRequest,
  ShowsSearchResponse,
  ShowsSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
