// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  applySimplenightApiKey,
  getSimplenightApiKey,
} from 'apiCalls/config/middlewares/authHeaderMiddleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  applyApiBaseUrlV2,
  forwardError,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';

import { createServerAxiosInstance } from 'apiCalls/config/axiosHelper';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    applySimplenightApiKey(req, res);
    const axios = createServerAxiosInstance(req);
    const params = req.query;

    const endpoint = `/hotels/`;
    const url = applyApiBaseUrlV2(endpoint);

    const response = await axios.get<HotelSearchResponse>(url, {
      params,
    });

    sendSuccess(res, response.data);
  } catch (err: any) {
    forwardError(err, res);
  }
}
