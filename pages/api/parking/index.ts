import type { NextApiResponse } from 'next';
import { ParkingCategory } from '../../../parking';
import { NextApiRequestWithSession } from '../../../types/core/server';

const handler = (req: NextApiRequestWithSession, res: NextApiResponse) => {
  return new Promise((resolve) => {
    ParkingCategory.core.ServerSearcher?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
};

export default handler;
