// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
// import axios from 'axios';
import { FlightBookingResponse } from 'flights/types/response/FlightBookingResponse';
import {
  applySimplenightApiKey,
  setSession,
} from 'apiCalls/config/middlewares/authHeaderMiddleware';
import { createServerAxiosInstance } from 'apiCalls/config/axiosHelper';
import { NextApiRequestWithSession } from 'types/core/server';

export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<any>,
) {
  try {
    await setSession(req);
    applySimplenightApiKey(req, res);
    const axios = createServerAxiosInstance(req);
    console.log('req = > ', req.headers);

    const { body } = req;

    const { data } = await axios.post<FlightBookingResponse>(
      'https://dev-ms.simplenight.com/sn-booking-service/reservation',
      body,
    );

    console.log('data from reservation =>  ', data);
    console.log('uui getted from db ', data.booking?.bookingId);

    if (data.errorMessage?.error) {
      res.status(400).json({ error: data.errorMessage?.error }); // TODO: Send error
    }

    const controlNumber =
      data.pnrReply.pnrHeader[0].reservationInfo.reservation[0].controlNumber;
    if (controlNumber) {
      try {
        const { data: data1 } = await axios.post(
          `https://dev-ms.simplenight.com/sn-booking-service/ticket/${controlNumber}`,
        );

        console.log('data 1 => ', data1);
        const { data } = await axios.get(
          `https://dev-ms.simplenight.com/sn-booking-service/reservation/${controlNumber}`,
        );

        res.status(200).json({
          booking: data,
        });
      } catch (error) {
        console.log('eerrororor = > ', error);
        res.status(400).json({ booking: {} });
      }
    }

    if (!data) throw new Error('Flight booking error');
    res.status(200).json({ ...data });
  } catch (error) {
    console.log('errorr => ', error);
    res.status(400).json({ booking: {} });
  }
}
