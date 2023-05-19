// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { CarBookingResponseMs } from 'cars/types/response/CarBookingResponseMs';
import { bookingMock } from 'mocks/carBookingMock';
import { bookingResponseAdapter } from 'cars/adapters/bookingResponseMs.adapter';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { id } = req.query;

    // const { data } = await axios.get<CarBookingResponseMs>(
    //   'https://sn-cars-booking-dev-rsk7bmoira-uc.a.run.app/v1/cars/booking/${id}',
    //   {
    //     headers: {
    //       Accept: 'application/json',
    //     },
    //   },
    // );
    const data = bookingMock;

    if (!data) throw new Error('Car detail booking error');
    res.status(200).json({ booking: bookingResponseAdapter({ ...data }) });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ booking: {} });
    } else {
      res.status(400).json({ booking: {} });
    }
  }
}
