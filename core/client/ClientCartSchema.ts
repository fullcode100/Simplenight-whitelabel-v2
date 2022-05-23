import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from './ClientRequester';
import { CartSchemaResponse } from 'types/cart/CartType';

export class ClientCartSchema<
  CartSchemaRequest,
  PreCartSchemaRequest,
> extends ClientRequester<
  CartSchemaRequest,
  CartSchemaResponse,
  PreCartSchemaRequest
> {
  protected override doRequest(
    request: CartSchemaRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<CartSchemaResponse, any>> {
    if (!id) throw new Error('cart id is required');

    const cartUrl = `/carts/${id}/schema`;

    return axios.get<CartSchemaResponse>(cartUrl);
  }
}
