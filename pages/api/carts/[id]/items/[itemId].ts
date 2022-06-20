import { ServerCartRemover } from 'core/server/ServerCartItemRemover';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CartResponse } from '../../../../../types/cart/CartType';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartResponse>,
) {
  return new Promise((resolve) => {
    const cartOption = {
      name: 'cart',
      value: 'cart',
    };
    const cartItemRemover = new ServerCartRemover(cartOption);
    cartItemRemover.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
