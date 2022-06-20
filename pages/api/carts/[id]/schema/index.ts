// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartSchema } from 'core/server/ServerCartSchema';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  return new Promise((resolve) => {
    const cartOption = {
      name: 'cart',
      value: 'cart',
    };
    const cartSchema = new ServerCartSchema(cartOption);
    cartSchema.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
