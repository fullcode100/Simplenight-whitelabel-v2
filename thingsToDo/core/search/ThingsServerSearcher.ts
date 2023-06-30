import { sendSuccess } from 'apiCalls/config/responseHelpers';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { NextApiResponse } from 'next';
import { ThingsSearchResponse } from 'thingsToDo/types/response/ThingsSearchResponse';
import { NextApiRequestWithSession } from 'types/core/server';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { searchAdapter } from '../../adapters/search.adapter';

export class ThingsServerSearcher extends ServerSearcher<ThingsSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
  protected override postRequestResult(
    request: NextApiRequestWithSession,
    response: NextApiResponse<ThingsSearchResponse>,
    result: ThingsSearchResponse,
  ): void {
    if (result) {
      const adaptedResult = searchAdapter(result);
      sendSuccess(response, adaptedResult);
      return;
    }
  }
}
