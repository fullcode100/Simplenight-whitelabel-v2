import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { CartServerResponse } from 'types/cart/CartType';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerCartItemAdder extends ServerRequester<CartServerResponse> {
  public constructor(category: CoreOption) {
    super(category);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { body } = request;

    const req = body.data.cart;
    const cartUrl = body.data.url;

    const url = applyApiBaseUrlV2(cartUrl, request);

    return axios.post<ApiResponse<any, CartServerResponse>>(url, {
      ...req,
    });
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<CartServerResponse>,
    result: CartServerResponse,
  ): void {
    if (result.carts) {
      sendSuccess(response, { cart: result.carts[0] });
      return;
    }
    sendSuccess(response, result.item);
  }
}
