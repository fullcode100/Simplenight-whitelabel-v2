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
  let axios;
  let reservation;
  try {
    await setSession(req);
    applySimplenightApiKey(req, res);
    axios = createServerAxiosInstance(req);
  } catch (error) {
    res.status(400).json({
      message: 'Reservation failed',
      error: 'Axios failed',
    });
  }

  if (axios) {
    try {
      const { body } = req;

      reservation = await axios.post<FlightBookingResponse>(
        'https://dev-ms.simplenight.com/sn-booking-service/reservation',
        body,
      );

      if (reservation.data.errorMessage?.error) {
        res.status(400).json({
          message: 'Reservation failed',
          error: reservation.data.errorMessage?.error,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: 'We are not able to create a reservation',
      });
    }

    const controlNumber =
      reservation?.data.pnrReply.pnrHeader[0].reservationInfo.reservation[0]
        .controlNumber;

    if (reservation && controlNumber) {
      try {
        const { data: data1 } = await axios.post(
          `https://dev-ms.simplenight.com/sn-booking-service/ticket/${controlNumber}`,
        );

        res.status(200).json({
          booking: {
            booking_id: reservation.data.booking?.bookingId,
            ...reservation.data,
            ticket: data1,
          },
        });
      } catch (error) {
        res.status(400).json({
          message: `We are not able to complete ticketing for ${controlNumber}`,
        });
      }
    } else {
      res.status(400).json({
        message: 'We are not able to create a reservation currently',
      });
    }
  }
}
