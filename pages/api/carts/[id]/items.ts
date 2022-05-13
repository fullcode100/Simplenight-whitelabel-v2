// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartItemAdder } from 'core/server/ServerCartItemAdder';
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
    const cartItemAdder = new ServerCartItemAdder(cartOption);
    cartItemAdder.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
