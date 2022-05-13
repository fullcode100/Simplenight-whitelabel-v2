import { AxiosInstance, AxiosResponse } from 'axios';
import {
  NewCartRequest,
  CartResponse,
  UpdateCartRequest,
} from 'types/cart/CartType';
import { ClientRequester } from './ClientRequester';

export class ClientCartItemAdder extends ClientRequester<
  NewCartRequest | UpdateCartRequest,
  CartResponse,
  NewCartRequest | UpdateCartRequest
> {
  protected override doRequest(
    request: NewCartRequest | UpdateCartRequest,
    axios: AxiosInstance,
    cartUrl: string,
  ): Promise<AxiosResponse<CartResponse, any>> {
    return axios.post<CartResponse>(cartUrl, {
      data: request,
    });
  }
}
