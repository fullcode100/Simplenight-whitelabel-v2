import type { NextApiResponse } from 'next';
import { TransportationCategory } from '../../../transportation';
import { NextApiRequestWithSession } from '../../../types/core/server';

const handler = (req: NextApiRequestWithSession, res: NextApiResponse) => {
  return new Promise((resolve) => {
    TransportationCategory.core.ServerSearcher?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
};

export default handler;
