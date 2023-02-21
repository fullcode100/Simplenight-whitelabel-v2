import { NextApiResponse } from 'next';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { ShowsAndEventsSearchResponse } from 'showsAndEvents/types/response/ShowsSearchResponse';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { NextApiRequestWithSession } from 'types/core/server';
import { searchAdapter } from '../../adapters/search.adapter';
import { sendSuccess } from 'apiCalls/config/responseHelpers';

export class ShowsServerSearcher extends ServerSearcher<ShowsAndEventsSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
  protected override postRequestResult(
    request: NextApiRequestWithSession,
    response: NextApiResponse<ShowsAndEventsSearchResponse>,
    result: ShowsAndEventsSearchResponse,
  ): void {
    if (result) {
      const adaptedResult = searchAdapter(result.items);
      sendSuccess(response, adaptedResult);
    }
  }
}
