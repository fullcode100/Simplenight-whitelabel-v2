import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { NextApiResponse } from 'next';
import { CartSchemaResponse } from 'types/cart/CartType';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerCartSchema extends ServerRequester<CartSchemaResponse> {
  public constructor(props: CoreOption) {
    super(props);
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query: params } = request;

    const cartUrl = `/carts/${params.id}/schema`;

    const url = applyApiBaseUrlV2(cartUrl, request);

    return axios.get<ApiResponse<any, any>>(url, {});
  }
}
