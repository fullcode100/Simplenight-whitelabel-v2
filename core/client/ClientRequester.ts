import { AxiosInstance, AxiosResponse } from 'axios';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import axios from 'apiCalls/config/axiosHelper';

export abstract class ClientRequester<
  Request,
  Response,
  PreRequest,
> {
  public constructor(protected readonly category: CategoryOption) {
  }

  public async request(preRequest: PreRequest, ...args: any): Promise<Response> {
    const request = this.preRequest(preRequest, ...args);

    const result = await this.doRequest(request, axios, ...args);

    this.postRequest(request, result);

    const { data } = result;
    this.postRequestResult(request, data);

    return data;
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
  ): void {}

  protected postRequestResult(
    request: Request,
    result: Response,
  ): void {}
}

