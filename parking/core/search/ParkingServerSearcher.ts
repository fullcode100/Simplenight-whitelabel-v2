import { ServerSearcher } from 'core/server/ServerSearcher';
import { ParkingSearchResponse } from 'parking/types/response/ParkingSearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { sendSuccess } from '../../../apiCalls/config/responseHelpers';

export class ParkingServerSearcher extends ServerSearcher<ParkingSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<ParkingSearchResponse>,
  ): [NextApiRequest, NextApiResponse<ParkingSearchResponse>] {
    return [request, response];
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<ParkingSearchResponse>,
    result: ParkingSearchResponse,
  ) {
    if (result?.items?.length > 0) {
      sendSuccess(response, { features: result.items[0].result.features });
    }
  }
}
