import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { DiningSearchResponse } from 'dining/types/response/SearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';

export class DiningServerSearcher extends ServerSearcher<DiningSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }
}
