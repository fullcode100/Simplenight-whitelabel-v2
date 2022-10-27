import { ClientSearcher } from 'core/client/ClientSearcher';
import { ThingsSearchRequest } from 'thingsToDo/types/request/ThingsSearchRequest';
import { ThingsSearchResponse } from 'thingsToDo/types/response/ThingsSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsClientSearcher extends ClientSearcher<
  ThingsSearchRequest,
  ThingsSearchResponse,
  ThingsSearchRequest
> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
