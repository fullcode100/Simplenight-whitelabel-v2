import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { formatCart } from 'helpers/cartUtils';
import { NextApiRequest, NextApiResponse } from 'next';
import { CartServerResponse } from 'types/cart/CartType';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerCartGetter extends ServerRequester<CartServerResponse> {
  public constructor(category: CoreOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequest,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params } = request;

    const cartUrl = `/carts/${params.id}`;

    const url = applyApiBaseUrlV2(cartUrl, request);

    return axios.get<ApiResponse<any, CartServerResponse>>(url, {});
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<CartServerResponse>,
    result: CartServerResponse,
  ): void {
    if (result.carts) {
      sendSuccess(response, { cart: result.carts[0] });
    }
  }
}
