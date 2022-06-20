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

export const getSimplenightApiKey = (req: NextApiRequest) => {
  const originUrl = getRequestHost(req);
  return { header: API_KEY_HEADER_KEY, key: getApiKey(originUrl) };
};
