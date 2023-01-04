import { ServerSearcher } from 'core/server/ServerSearcher';
import { TransportationSearchResponseItemResult } from 'transportation/types/response/TransportationSearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { sendSuccess } from '../../../apiCalls/config/responseHelpers';

export class TransportationServerSearcher extends ServerSearcher<TransportationSearchResponseItemResult> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override onError(
    err: any,
    res: NextApiResponse<TransportationSearchResponseItemResult>,
  ) {
    res.status(400).json({ items: [] });
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<TransportationSearchResponseItemResult>,
  ): [NextApiRequest, NextApiResponse<TransportationSearchResponseItemResult>] {
    return [request, response];
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<TransportationSearchResponseItemResult>,
    result: TransportationSearchResponseItemResult,
  ) {
    if (result?.items[0]?.response) {
      sendSuccess(response, {
        response: result?.items[0]?.response,
      });
    }
  }
}
