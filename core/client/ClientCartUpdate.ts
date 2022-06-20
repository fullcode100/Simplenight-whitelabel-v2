import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from './ClientRequester';

export class ClientCartUpdate<
  CartUpdateRequest,
  CartUpdateResponse,
  PreCartUpdateRequest,
> extends ClientRequester<
  CartUpdateRequest,
  CartUpdateResponse,
  PreCartUpdateRequest
> {
  protected override doRequest(
    request: CartUpdateRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<CartUpdateResponse, any>> {
    if (!id) throw new Error('cart id is required');
    const cartUrl = `/carts/${id}`;

    return axios.put<CartUpdateResponse>(cartUrl, {
      data: request,
    });
  }
}
