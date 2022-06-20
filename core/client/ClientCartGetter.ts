import { AxiosInstance, AxiosResponse } from 'axios';
import { CartClientResponse } from 'types/cart/CartType';
import { ClientRequester } from './ClientRequester';

export class ClientCartGetter<CartRequest> extends ClientRequester<
  CartRequest,
  CartClientResponse,
  CartRequest
> {
  protected override doRequest(
    request: CartRequest,
    axios: AxiosInstance,
    cartUrl: string,
  ): Promise<AxiosResponse<CartClientResponse, any>> {
    return axios.get<CartClientResponse>(cartUrl, {
      params: request,
    });
  }
}
