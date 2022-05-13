import { AxiosInstance, AxiosResponse } from 'axios';
import { CategoryOption, CoreOption } from 'types/search/SearchTypeOptions';
import axios, {
  axiosCurrencyInterceptor,
  axiosI18nInterceptor,
} from 'apiCalls/config/axiosHelper';
import { i18n } from 'i18next';

export abstract class ClientRequester<Request, Response, PreRequest> {
  public constructor(
    protected readonly category: CategoryOption | CoreOption,
  ) {}

  public async request(
    preRequest: PreRequest,
    i18next: i18n,
    ...args: any
  ): Promise<Response> {
    const request = this.preRequest(preRequest, ...args);

    this.addLanguageHeader(i18next);

    this.addCurrencyQueryParameter(request);

    const result = await this.doRequest(request, axios, ...args);

    this.postRequest(request, result);

    const { data } = result;
    this.postRequestResult(request, data);

    return data;
  }

  protected addLanguageHeader(i18next: i18n): void {
    axios.interceptors.request.use(axiosI18nInterceptor(i18next), (error) =>
      Promise.reject(error),
    );
  }

  protected addCurrencyQueryParameter(request: Request): void {
    axios.interceptors.request.use(axiosCurrencyInterceptor('USD'), (error) =>
      Promise.reject(error),
    );
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
