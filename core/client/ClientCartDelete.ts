import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from './ClientRequester';

export class ClientCartDelete<
  CartDeleteRequest,
  CartDeleteResponse,
  PreCartDeleteRequest,
> extends ClientRequester<
  CartDeleteRequest,
  CartDeleteResponse,
  PreCartDeleteRequest
> {
  protected override doRequest(
    id: any,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<CartDeleteResponse, any>> {
    if (!id) throw new Error('cart id is required');
    const cartUrl = `/carts/${id}`;

    return axios.delete<CartDeleteResponse>(cartUrl);
  }
}
