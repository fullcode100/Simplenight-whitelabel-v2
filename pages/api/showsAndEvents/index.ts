// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { ShowsAndEventsCategory } from 'showsAndEvents';
import { NextApiRequestWithSession } from 'types/core/server';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<Data>,
) {
  return new Promise((resolve) => {
    ShowsAndEventsCategory.core.ServerSearcher?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
