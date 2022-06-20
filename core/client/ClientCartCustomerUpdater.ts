import { AxiosInstance, AxiosResponse } from 'axios';
import { CartObjectResponse } from 'types/cart/CartType';
import { AddCustomerRequest } from 'types/checkout/AddCustomerRequest';
import { ClientRequester } from './ClientRequester';

export class ClientCartCustomerUpdater extends ClientRequester<
  AddCustomerRequest,
  CartObjectResponse,
  AddCustomerRequest
> {
  public constructor() {
    const category = {
      name: 'cart',
      value: 'cart',
    };
    super(category);
  }

  protected override doRequest(
    request: AddCustomerRequest,
    axios: AxiosInstance,
    id: any,
  ): Promise<AxiosResponse<CartObjectResponse, any>> {
    if (!id) throw new Error('cart id is required');

    const clientUpdateCartUrl = `/carts/${id}/customers`;

    return axios.put<CartObjectResponse>(clientUpdateCartUrl, {
      data: request,
    });
  }
}
