// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CarBookingCancelationResponseMs } from 'cars/types/response/CarBookingCancelationResponseMs';
import { bookingMock } from 'mocks/carBookingCancelationMock';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { id } = req.query;

    const body = {
      Data: {
        Status: 'CANCELLED',
      },
    };

    // const { data } = await axios.put<CarBookingCancelationResponseMs>(
    //   `https://sn-cars-booking-dev-rsk7bmoira-uc.a.run.app/v1/cars/booking/${id}`,
    //   body,
    //   {
    //     headers: {
    //       Accept: 'application/json',
    //     },
    //   },
    // );
    const data = bookingMock;

    if (!data) throw new Error('Car cancelation booking error');
    res.status(200).json({ ...data });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ booking: {} });
    } else {
      res.status(400).json({ booking: {} });
    }
  }
}
