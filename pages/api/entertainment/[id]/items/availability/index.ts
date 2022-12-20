// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ThingsCategory } from 'thingsToDo';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  return new Promise((resolve) => {
    ThingsCategory.core.ServerAvailability?.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}
