import { createServerAxiosInstance } from "apiCalls/config/axiosHelper";
import { applySimplenightApiKey } from "apiCalls/config/middlewares/authHeaderMiddleware";
import { sendSuccess, forwardError } from "apiCalls/config/responseHelpers";
import { AxiosInstance, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryOption } from "types/search/SearchTypeOptions";

export abstract class ServerRequester<Response> {
  protected constructor(protected readonly category: CategoryOption) {}

  public async handle(
    req: NextApiRequest,
    res: NextApiResponse<Response>,
  ): Promise<void> {
    try {
      applySimplenightApiKey(req, res);
      const axios = createServerAxiosInstance(req);

      const [request, response] = this.preRequest(req, res);

      const result = await this.doRequest(request, response, axios);

      this.postRequest(request, response, result);

      const { data } = result;
      this.postRequestResult(request, response, data);
    } catch (err) {
      this.onError(err, res);
    }
  }

  protected preRequest(
    request: NextApiRequest,
    response: NextApiResponse<Response>,
  ): [NextApiRequest, NextApiResponse<Response>] {
    return [request, response];
  }

  protected abstract doRequest(
    request: NextApiRequest,
    response: NextApiResponse<Response>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<Response, any>>;

  protected postRequest(
    request: NextApiRequest,
    response: NextApiResponse<Response>,
    result: AxiosResponse<Response>,
  ): void {}

  protected postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<Response>,
    result: Response,
  ): void {
    sendSuccess(response, result);
  }

  protected onError(err: any, res: NextApiResponse<Response>): void {
    forwardError(err, res);
  }
}
