/* eslint-disable indent */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartCustomerUpdater } from 'core/server/ServerCartCustomerUpdater';
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { CartResponse } from '../../../../types/cart/CartType';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<CartResponse>,
) {
  return new Promise((resolve) => {
    const customerHandler = new ServerCartCustomerUpdater();

    customerHandler.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
