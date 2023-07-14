// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { ParkingCategory } from '../../../parking';
import { NextApiRequestWithSession } from '../../../types/core/server';
import { ServerAuthLogin } from '../../../profiles/core/server/ServerAuthLogin';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) {
  return new Promise((resolve) => {
    new ServerAuthLogin().handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
