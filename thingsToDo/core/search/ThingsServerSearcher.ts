import { ServerSearcher } from 'core/server/ServerSearcher';
import { ThingsSearchResponse } from 'thingsToDo/types/response/ThingsSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ThingsServerSearcher extends ServerSearcher<ThingsSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
