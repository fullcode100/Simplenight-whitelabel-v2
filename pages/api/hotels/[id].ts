// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { applySimplenightApiKey } from 'apiCalls/config/middlewares/authHeaderMiddleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  applyApiBaseUrl,
  forwardError,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';

import { createServerAxiosInstance } from 'apiCalls/config/axiosHelper';
import { HotelSearchResponse } from 'hotels/types/response/SearchResponse';
import { HotelCategory } from 'hotels';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // try {
  //   applySimplenightApiKey(req, res);
  //   const axios = createServerAxiosInstance(req);
  //   const params = req.query;

  //   const endpoint = `/multi/hotel-details`;
  //   const url = applyApiBaseUrl(req, endpoint);

  //   delete params.id;

  //   const response = await axios.post<HotelSearchResponse>(url, {
  //     ...params,
  //   });

  //   sendSuccess(res, response.data);
  // } catch (err: any) {
  //   forwardError(err, res);
  // }
  HotelCategory.core.ServerDetailer?.handle(req, res);
}
