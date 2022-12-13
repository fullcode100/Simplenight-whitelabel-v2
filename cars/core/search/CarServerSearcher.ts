import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { CarSearchResponse } from 'cars/types/response/SearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class CarServerSearcher extends ServerSearcher<CarSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<CarSearchResponse>,
  ): [NextApiRequest, NextApiResponse<CarSearchResponse>] {
    const lang = request.headers['accept-language'];

    return [request, response];
  }
}
