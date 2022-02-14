import { NextApiRequest } from 'next';
import { selectApiUrl } from './axiosHelper';
import { getRequestHost } from './requestHelpers';

export const applyApiBaseUrl = (req: NextApiRequest, endpoint: string) => {
  const originUrl = getRequestHost(req);
  const apiUrl = selectApiUrl(originUrl);
  return `${apiUrl}${endpoint}`;
};
