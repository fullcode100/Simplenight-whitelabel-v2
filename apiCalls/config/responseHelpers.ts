import { AxiosError } from 'axios';
import { NextApiRequest } from 'next';
import { selectApiUrl } from './axiosHelper';
import { getRequestHost } from './requestHelpers';

const API_V2_URL = 'https://dev-api-v2.simplenight.com/v2';

export const applyApiBaseUrl = (req: NextApiRequest, endpoint: string) => {
  const originUrl = getRequestHost(req);
  const apiUrl = selectApiUrl(originUrl);
  return `${apiUrl}${endpoint}`;
};

export const applyApiBaseUrlV2 = (endpoint: string) => {
  return `${API_V2_URL}${endpoint}`;
};

export const forwardError = (err: any, res: any) =>
  res.status(err.response?.status ?? 500).json(err.response.data);

export const sendSuccess = (res: any, data: any) => res.status(200).json(data);
