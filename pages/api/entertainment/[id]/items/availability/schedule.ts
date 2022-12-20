// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { ThingsCategory } from 'thingsToDo';
import { NextApiRequestWithSession } from 'types/core/server';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<Data>,
) {
  return new Promise((resolve) => {
    ThingsCategory.core.ServerAvailabilitySchedule?.handle(req, res).then(
      () => {
        return resolve(null);
      },
    );
  });
}
