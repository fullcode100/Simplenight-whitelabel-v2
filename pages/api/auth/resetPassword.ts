// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from '../../../types/core/server';
import { ServerAuthResetPassword } from '../../../profiles/core/server/ServerAuthResetPassword';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) {
  return new Promise((resolve) => {
    new ServerAuthResetPassword().handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
