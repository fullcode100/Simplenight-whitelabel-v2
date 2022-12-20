import { ServerSearcher } from 'core/server/ServerSearcher';
import { TransportationSearchResponse } from 'transportation/types/response/TransportationSearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class TransportationServerSearcher extends ServerSearcher<TransportationSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<TransportationSearchResponse>,
  ): [NextApiRequest, NextApiResponse<TransportationSearchResponse>] {
    return [request, response];
  }
}
