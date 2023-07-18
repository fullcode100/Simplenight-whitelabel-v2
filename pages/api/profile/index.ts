// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from '../../../types/core/server';
import { ServerProfileCreate } from '../../../profiles/core/server/ServerProfileCreate';
import { ServerProfileDetails } from '../../../profiles/core/server/ServerProfileDetails';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return new Promise((resolve) => {
      new ServerProfileCreate().handle(req, res).then(() => {
        return resolve(null);
      });
    });
  }
  if (req.method === 'GET') {
    return new Promise((resolve) => {
      new ServerProfileDetails().handle(req, res).then(() => {
        return resolve(null);
      });
    });
  }
}
