// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from '../../../types/core/server';
import { ServerAuthConfigurePassword } from '../../../profiles/core/server/ServerAuthConfigurePassword';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) {
  return new Promise((resolve) => {
    new ServerAuthConfigurePassword().handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
