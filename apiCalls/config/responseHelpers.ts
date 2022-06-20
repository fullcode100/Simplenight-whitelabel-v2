import { AxiosError } from 'axios';
import { NextApiRequest } from 'next';
import { selectApiUrl } from './axiosHelper';
import { getRequestHost } from './requestHelpers';

const API_V2_URL = 'https://dev-api.simplenight.com/v2';
const API_QA_V2_URL = 'https://qa-api.simplenight.com/v2';
const API_PROD_V2_URL = 'https://api.simplenight.com/v2';

export const applyApiBaseUrl = (req: NextApiRequest, endpoint: string) => {
  const originUrl = getRequestHost(req);
  const apiUrl = selectApiUrl(originUrl);
  return `${apiUrl}${endpoint}`;
};

export const applyApiBaseUrlV2 = (
  endpoint: string,
  request: NextApiRequest,
) => {
  // const host = request.headers.host;
  // if (host && host.includes('qa')) return `${API_QA_V2_URL}${endpoint}`;
  // return `${API_V2_URL}${endpoint}`;
  return `${API_PROD_V2_URL}${endpoint}`;
};

export const forwardError = (err: any, res: any) => {
  const apiErrors = err.response?.data?.errors;
  const axiosErrorMessage = err.message;

  console.error(err);

  return res
    .status(err.response?.status ?? 500)
    .json({ errors: apiErrors } ?? axiosErrorMessage);
};

export const sendSuccess = (res: any, data: any) => res.status(200).json(data);
