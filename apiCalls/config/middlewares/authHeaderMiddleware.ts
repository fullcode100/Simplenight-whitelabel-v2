import { getCredentials } from 'apiCalls/settings';
import { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import {
  getRequestReferer,
  encryptSession,
  decryptSession,
} from '../requestHelpers';

export const X_SESSION = 'x-session';

export const applySimplenightApiKey = (
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) => {
  const session = encryptSession(req.session);
  res.setHeader(X_SESSION, session);
};

export const setSession = async (req: NextApiRequestWithSession) => {
  if (req.headers[X_SESSION] == '') {
    const originRefefer = getRequestReferer(req);
    const data = await getCredentials(originRefefer);
    req.session = data;
    return;
  }
  req.session = decryptSession(req);
};

export const getSimplenightApiKey = (req: NextApiRequestWithSession) => {
  const { token: apiKey, token_type: apiHeaderKey } = req.session;
  return { header: apiHeaderKey, key: apiKey };
};
