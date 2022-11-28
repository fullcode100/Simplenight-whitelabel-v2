// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { HotelCategory } from 'hotels';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { NextApiRequestWithSession } from 'types/core/server';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<Data>,
) {
  return new Promise((resolve) => {
    HotelCategory.core.ServerDetailer?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
