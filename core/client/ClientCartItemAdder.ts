import { AxiosInstance, AxiosResponse } from 'axios';
import {
  NewCartRequest,
  CartResponse,
  UpdateCartItemRequest,
} from 'types/cart/CartType';
import { ClientRequester } from './ClientRequester';

export class ClientCartItemAdder extends ClientRequester<
  NewCartRequest | UpdateCartItemRequest,
  CartResponse,
  NewCartRequest | UpdateCartItemRequest
> {
  protected override doRequest(
    request: NewCartRequest | UpdateCartItemRequest,
    axios: AxiosInstance,
    cartUrl: string,
  ): Promise<AxiosResponse<CartResponse, any>> {
    return axios.post<CartResponse>(cartUrl, {
      data: request,
    });
  }
}
