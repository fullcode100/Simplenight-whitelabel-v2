import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { FlightSearchResponse } from 'flights/types/response/SearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class FlightServerSearcher extends ServerSearcher<FlightSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<FlightSearchResponse>,
  ): [NextApiRequest, NextApiResponse<FlightSearchResponse>] {
    const lang = request.headers['accept-language'];

    return [request, response];
  }
}
