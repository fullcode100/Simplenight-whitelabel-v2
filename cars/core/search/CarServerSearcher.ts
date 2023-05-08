import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerSearcher } from 'core/server/ServerSearcher';
import {
  CarSearchResponse,
  CarSearchItem,
} from 'cars/types/adapter/SearchAdapter';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { NextApiRequestWithSession } from 'types/core/server';
import { sendSuccess } from 'apiCalls/config/responseHelpers';
import { searchAdapter } from 'cars/adapters/search.adapter';

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

  protected override postRequestResult(
    request: NextApiRequestWithSession,
    response: NextApiResponse<CarSearchResponse>,
    result: CarSearchResponse,
  ): void {
    if (result && result.items) {
      const data = result.items[0];
      sendSuccess(response, {
        items: searchAdapter(data as unknown as CarSearchItem[]),
      });
    }
  }
}
