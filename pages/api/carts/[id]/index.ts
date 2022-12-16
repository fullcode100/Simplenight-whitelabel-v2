/* eslint-disable indent */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartDelete } from 'core/server/ServerCartDelete';
import { ServerCartGetter } from 'core/server/ServerCartGetter';
import { ServerCartUpdate } from 'core/server/ServerCartUpdate';
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import { CartResponse } from '../../../../types/cart/CartType';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<CartResponse>,
) {
  return new Promise((resolve) => {
    const method = req.method ?? 'GET';
    const cartOption = {
      name: 'cart',
      value: 'cart',
    };
    const cartGetter = new ServerCartGetter(cartOption);
    const cartUpdate = new ServerCartUpdate(cartOption);
    const cartDelete = new ServerCartDelete(cartOption);
    const getMethod = (method: string) => {
      switch (method) {
        case 'GET':
          return cartGetter;
        case 'PUT':
          return cartUpdate;
        case 'DELETE':
          return cartDelete;
        default:
          return cartGetter;
      }
    };
    const cartMethod = getMethod(method);
    cartMethod.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
