// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerBookingCreator } from 'core/server/ServerBookingCreator';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  return new Promise((resolve) => {
    const serverBookingCreator = new ServerBookingCreator();
    serverBookingCreator.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
