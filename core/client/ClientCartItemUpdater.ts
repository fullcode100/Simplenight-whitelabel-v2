import { AxiosInstance, AxiosResponse } from 'axios';
import { CartResponse } from 'types/cart/CartType';
import { ClientRequester } from './ClientRequester';

export class ClientCartItemUpdater<CartRequest> extends ClientRequester<
  CartRequest,
  CartResponse,
  CartRequest
> {
  protected override doRequest(
    request: CartRequest,
    axios: AxiosInstance,
    cartUrl: string,
  ): Promise<AxiosResponse<CartResponse, any>> {
    return axios.put<CartResponse>(cartUrl, {
      data: request,
    });
  }
}
