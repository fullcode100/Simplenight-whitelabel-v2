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

export class ServerCartCustomerUpdater extends ServerRequester<CartServerResponse> {
  public constructor() {
    const category = {
      name: 'cart',
      value: 'cart',
    };
    super(category);
  }

  protected override doRequest(
    request: NextApiRequest,
    _response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { body, query } = request;
    const { id } = query;

    const cartUrl = `/carts/${id}`;
    const url = applyApiBaseUrlV2(cartUrl, request);

    return axios.put<ApiResponse<any, CartServerResponse>>(url, {
      ...body.data,
    });
  }

  protected override postRequestResult(
    _request: NextApiRequest,
    response: NextApiResponse<CartServerResponse>,
    result: CartServerResponse,
  ): void {
    if (result.carts) {
      const formatResult = formatCart(result.carts[0]);
      sendSuccess(response, { cart: formatResult });
    }
  }
}
