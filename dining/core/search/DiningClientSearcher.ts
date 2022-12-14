import { ClientSearcher } from 'core/client/ClientSearcher';
import {
  DiningSearchRequest,
  DiningSearchreRequest,
} from 'dining/types/request/DiningSearchRequest';
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

  protected override preRequest(
    request: DiningSearchRequest,
    ...args: any
  ): DiningSearchRequest {
    const newRequest = Object.assign({}, request as any);

    console.log('pre request from CLIENTE SEA = > ', newRequest);
    return newRequest;
  }
}
