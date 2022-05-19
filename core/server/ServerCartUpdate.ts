import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { CartResponse } from 'types/cart/CartType';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerCartUpdate extends ServerRequester<CartResponse> {
  public constructor(category: CoreOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { body, query } = request;

    const cartUrl = `/carts/${query.id}`;
    const url = applyApiBaseUrlV2(cartUrl);

    return axios.put<ApiResponse<any, CartResponse>>(url, {
      ...body.data,
    });
  }
}
