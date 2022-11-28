// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerBookingCreator } from 'core/server/ServerBookingCreator';
import { ServerBookingsGetter } from 'core/server/ServerBookingsGetter';
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<any>,
) {
  return new Promise((resolve) => {
    if (req.method == 'POST') {
      const serverBookingCreator = new ServerBookingCreator();
      serverBookingCreator.handle(req, res).then(() => {
        return resolve(null);
      });
    } else {
      const serverBookingsGetter = new ServerBookingsGetter();
      serverBookingsGetter.handle(req, res).then(() => {
        return resolve(null);
      });
    }
  });
}
