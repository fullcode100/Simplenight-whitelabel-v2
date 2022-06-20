import { AxiosInstance, AxiosResponse } from 'axios';
import { ClientRequester } from './ClientRequester';

export abstract class ClientUpdateCart<
  UpdateCartRequest,
  UpdateCartResponse,
  PreUpdateCartRequest,
> extends ClientRequester<
  UpdateCartRequest,
  UpdateCartResponse,
  PreUpdateCartRequest
> {
  protected override doRequest(
    request: UpdateCartRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<UpdateCartResponse, any>> {
    if (!id) throw new Error('cart id is required');

    const clientUpdateCartUrl = `/carts/${id}`;

    return axios.put<UpdateCartResponse>(clientUpdateCartUrl, {
      data: request,
    });
  }
}
