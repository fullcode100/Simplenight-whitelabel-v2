// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerBookingItemRemover } from 'core/server/ServerBookingItemRemover';
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<any>,
) {
  return new Promise((resolve) => {
    const serverBookingItemRemover = new ServerBookingItemRemover();
    serverBookingItemRemover.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
