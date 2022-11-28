// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerBookingCancel } from 'core/server/ServerBookingCancel';
import { ServerBookingGetter } from 'core/server/ServerBookingGetter';
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<any>,
) {
  return new Promise((resolve) => {
    if (req.method == 'DELETE') {
      const serverBookingCancel = new ServerBookingCancel();
      serverBookingCancel.handle(req, res).then(() => {
        return resolve(null);
      });
    } else {
      const serverBookingGetter = new ServerBookingGetter();
      serverBookingGetter.handle(req, res).then(() => {
        return resolve(null);
      });
    }
  });
}
