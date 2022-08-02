// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerBookingGetter } from 'core/server/ServerBookingGetter';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  return new Promise((resolve) => {
    const serverBookingGetter = new ServerBookingGetter();
    serverBookingGetter.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
