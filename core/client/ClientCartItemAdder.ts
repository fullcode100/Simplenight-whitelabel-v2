import { AxiosInstance, AxiosResponse } from 'axios';
import {
  NewCartRequest,
  CartClientResponse,
  UpdateCartItemRequest,
} from 'types/cart/CartType';
import { ClientRequester } from './ClientRequester';

export class ClientCartItemAdder extends ClientRequester<
  NewCartRequest | UpdateCartItemRequest,
  CartClientResponse,
  NewCartRequest | UpdateCartItemRequest
> {
  protected override doRequest(
    request: NewCartRequest | UpdateCartItemRequest,
    axios: AxiosInstance,
    cartUrl: string,
  ): Promise<AxiosResponse<CartClientResponse, any>> {
    return axios.post<CartClientResponse>(cartUrl, {
      data: request,
    });
  }
}
