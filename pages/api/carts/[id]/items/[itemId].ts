import { ServerCartRemover } from 'core/server/ServerCartItemRemover';
import { ServerCartItemUpdater } from 'core/server/ServerCartItemUpdater';
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
    if (req.method == 'DELETE') {
      const cartItemRemover = new ServerCartRemover(cartOption);
      cartItemRemover.handle(req, res).then(() => {
        return resolve(null);
      });
    } else {
      const cartItemUpdater = new ServerCartItemUpdater(cartOption);
      cartItemUpdater.handle(req, res).then(() => {
        return resolve(null);
      });
    }
  });
}
