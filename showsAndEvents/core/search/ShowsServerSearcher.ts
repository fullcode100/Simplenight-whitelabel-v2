import { ServerSearcher } from 'core/server/ServerSearcher';
import { ShowsSearchResponse } from 'showsAndEvents/types/response/ShowsSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class ShowsServerSearcher extends ServerSearcher<ShowsSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
