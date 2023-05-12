// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { FlightBookingResponse } from 'flights/types/response/FlightBookingResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { body } = req;

    const { data } = await axios.post<FlightBookingResponse>(
      'https://api-dev.simplenight.com/sn-booking-service/reservation',
      body,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const controlNumber =
      data.pnrReply.pnrHeader[0].reservationInfo.reservation[0].controlNumber;

    if (controlNumber) {
      try {
        const { data } = await axios.get(
          `https://api-dev.simplenight.com/sn-booking-service/reservation/${controlNumber}`,
        );

        res.status(200).json({
          booking: data,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          res.status(400).json({ booking: {} });
        } else {
          res.status(400).json({ booking: {} });
        }
      }
    }

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
