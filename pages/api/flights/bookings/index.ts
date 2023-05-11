// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { body } = req;
    const { data } = await axios.post(
      'https://api-dev.simplenight.com/sn-booking-service/reservation',
      body,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (!data) throw new Error('Flight booking error');
    res.status(200).json({ ...data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ booking: {} });
    } else {
      res.status(400).json({ booking: {} });
    }
  }
}
