// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { DiningCategory } from 'dining';
import { NextApiRequestWithSession } from 'types/core/server';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<Data>,
) {
  return new Promise((resolve) => {
    DiningCategory.core.ServerSearcher?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
