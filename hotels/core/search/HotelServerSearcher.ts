import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class HotelServerSearcher extends ServerSearcher<HotelSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<HotelSearchResponse>,
  ): [NextApiRequest, NextApiResponse<HotelSearchResponse>] {
    const lang = request.headers['accept-language'];

    return [request, response];
  }
}
