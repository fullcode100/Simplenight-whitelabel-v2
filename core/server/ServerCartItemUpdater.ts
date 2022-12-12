import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiResponse } from 'next';
import { CartResponse } from 'types/cart/CartType';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerCartItemUpdater extends ServerRequester<CartResponse> {
  public constructor(category: CoreOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params, body } = request;

    const cartUrl = `/carts/${params.id}/items/${params.itemId}`;

    const url = applyApiBaseUrlV2(cartUrl, request);

    return axios.put<ApiResponse<any, CartResponse>>(url, {
      ...body.data,
    });
  }
}
