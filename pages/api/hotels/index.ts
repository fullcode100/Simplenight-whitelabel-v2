// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { HotelCategory } from 'hotels';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  return new Promise((resolve) => {
    HotelCategory.core.ServerSearcher?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
