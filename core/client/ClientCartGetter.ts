import { AxiosInstance, AxiosResponse } from 'axios';
import { CartResponse } from 'types/cart/CartType';
import { ClientRequester } from './ClientRequester';

export class ClientCartGetter<CartRequest> extends ClientRequester<
  CartRequest,
  CartResponse,
  CartRequest
> {
  protected override doRequest(
    request: CartRequest,
    axios: AxiosInstance,
    cartUrl: string,
  ): Promise<AxiosResponse<CartResponse, any>> {
    return axios.get<CartResponse>(cartUrl, {
      params: request,
    });
  }
}
