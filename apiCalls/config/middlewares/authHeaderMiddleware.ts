import { NextApiRequest, NextApiResponse } from 'next';
import { getApiKey, API_KEY_HEADER_KEY } from '../axiosHelper';
import { getRequestHost } from '../requestHelpers';

export const applySimplenightApiKey = (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const originUrl = getRequestHost(req);
  const apiKey = getApiKey(originUrl);
  res.setHeader(API_KEY_HEADER_KEY, apiKey);
};
