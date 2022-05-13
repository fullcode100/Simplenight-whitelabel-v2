// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartGetter } from 'core/server/ServerCartGetter';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CartResponse } from '../../../../types/cart/CartType';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartResponse>,
) {
  return new Promise((resolve) => {
    const cartOption = {
      name: 'cart',
      value: 'cart',
    };
    const cartGetter = new ServerCartGetter(cartOption);
    cartGetter.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
