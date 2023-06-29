// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CarBookingResponseMs } from 'cars/types/response/CarBookingResponseMs';
import { bookingResponseAdapter } from 'cars/adapters/bookingResponseMs.adapter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { body } = req;
    const urlRequest = 'https://sn-cars-booking-dev-rsk7bmoira-uc.a.run.app';

    const { data } = await axios.post<CarBookingResponseMs>(
      `${urlRequest}/v1/cars/booking`,
      body,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const identification = data.Data.Identification;

    if (identification) {
      try {
        const { data } = await axios.get(
          `https://sn-cars-booking-dev-rsk7bmoira-uc.a.run.app/v1/cars/booking/${identification}`,
        );

        res.status(200).json({ booking: bookingResponseAdapter({ ...data }) });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          res.status(400).json({ booking: {} });
        } else {
          res.status(400).json({ booking: {} });
        }
      }
    }

    if (!data) throw new Error('Car booking error');
    res.status(200).json({ booking: bookingResponseAdapter({ ...data }) });
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      res.status(400).json({ booking: {} });
    } else {
      res.status(400).json({ booking: {} });
    }
  }
}
