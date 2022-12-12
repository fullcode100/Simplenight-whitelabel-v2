// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartItemAdder } from 'core/server/ServerCartItemAdder';
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { CartResponse } from '../../../../../types/cart/CartType';

export default async function handler(
  req: NextApiRequestWithSession,
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
