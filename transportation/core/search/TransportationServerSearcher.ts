import { ServerSearcher } from 'core/server/ServerSearcher';
import { TransportationData } from 'transportation/types/response/TransportationSearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { sendSuccess } from '../../../apiCalls/config/responseHelpers';

export class TransportationServerSearcher extends ServerSearcher<TransportationData> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override onError(
    err: any,
    res: NextApiResponse<TransportationData>,
  ) {
    res.status(400).json({ items: [] });
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<TransportationData>,
  ): [NextApiRequest, NextApiResponse<TransportationData>] {
    return [request, response];
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<TransportationData>,
    result: TransportationData,
  ) {
    console.log('results => items => ', result);
    if (result?.items[0]) {
      sendSuccess(response, result?.items[0]);
    }
  }
}
