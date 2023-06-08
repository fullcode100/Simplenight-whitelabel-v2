// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { body } = req;

    const { controlNumber } = req.query;

    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/reservation/${controlNumber}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!data) throw new Error('Flight cancellation error');
    res.status(200).json({ ...data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ booking: {} });
    } else {
      res.status(400).json({ booking: {} });
    }
  }
}
