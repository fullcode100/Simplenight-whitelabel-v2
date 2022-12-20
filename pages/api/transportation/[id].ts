// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { TransportationCategory } from '../../../transportation';
import { NextApiRequestWithSession } from '../../../types/core/server';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse,
) {
  return new Promise((resolve) => {
    TransportationCategory.core.ServerDetailer?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
