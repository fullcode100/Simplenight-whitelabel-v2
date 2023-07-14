import { AxiosInstance, AxiosResponse } from 'axios';
import { CategoryOption, CoreOption } from 'types/search/SearchTypeOptions';
import { createClientAxiosInstance } from 'apiCalls/config/axiosHelper';
import { i18n } from 'i18next';
import { CustomWindow } from 'types/global/CustomWindow';
import { X_SESSION } from 'apiCalls/config/middlewares/authHeaderMiddleware';

declare let window: CustomWindow;

export abstract class ClientRequester<Request, Response, PreRequest> {
  public constructor(
    protected readonly category: CategoryOption | CoreOption,
  ) {}

  public async request(
    preRequest: PreRequest,
    i18next: i18n,
    ...args: any
  ): Promise<Response> {
    const currency = this.getCurrency();
    const axios = createClientAxiosInstance(currency, i18next);

    const request = this.preRequest(preRequest, ...args);
    const result = await this.doRequest(request, axios, ...args);

    this.setSessionKey(result);

    this.postRequest(request, result);

    const { data } = result;
    this.postRequestResult(request, data);

    return data;
  }

  protected setSessionKey(response: AxiosResponse) {
    window.sessionStorage.setItem(X_SESSION, response.headers[X_SESSION]);
  }

  protected getCurrency(): string {
    const currency = window.currency ?? 'USD';
    if (!currency) throw new Error('currency is required');
    return currency;
  }

  protected preRequest(request: PreRequest, ...args: any): Request {
    return request as unknown as Request;
  }

  protected abstract doRequest(
    request: Request,
    axios: AxiosInstance,
    ...args: any
  ): Promise<AxiosResponse<Response, any>>;

  protected postRequest(
    request: Request,
    result: AxiosResponse<Response>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected postRequestResult(request: Request, result: Response): void {}
}
