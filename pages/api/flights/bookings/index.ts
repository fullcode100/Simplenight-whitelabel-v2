// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import axios from 'axios';
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
  let axiosInstance;
  try {
    await setSession(req);
    applySimplenightApiKey(req, res);
    axiosInstance = createServerAxiosInstance(req);
  } catch (error) {
    res.status(400).json({
      errors: [{ message: 'Reservation failed', error: 'Axios failed' }],
    });
  }
  try {
    if (axiosInstance) {
      try {
        console.log('Preparing reservation .....');
        const { body } = req;
        console.log('Starting reservation .....');
        const { data: reservation } =
          await axiosInstance.post<FlightBookingResponse>(
            `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/reservation`,
            body,
          );

        console.log('Getting response from /reservation .....');
        if (reservation.errorMessage?.error) {
          res.status(400).json({
            errors: [
              {
                message: 'Reservation failed',
                error: reservation.errorMessage?.error,
              },
            ],
          });
        }

        console.log('Preparing ticketing .....');
        const controlNumber =
          reservation?.pnrReply?.pnrHeader?.[0]?.reservationInfo
            ?.reservation?.[0]?.controlNumber;

        console.log('Validating PNR .....', controlNumber);
        if (reservation && controlNumber) {
          try {
            const { data: data1 } = await axiosInstance.post(
              `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/ticket/${controlNumber}`,
            );

            console.log('Confirming ticketing .....', data1);
            res.status(200).json({
              booking: {
                booking_id: reservation.booking?.bookingId,
                ...reservation,
                ticket: data1,
              },
            });
          } catch (error) {
            let supplierError = null;
            if (
              axios.isAxiosError(error) &&
              error.response &&
              error.response.data
            ) {
              supplierError = error.response.data;
            }
            res.status(400).json({
              errors: [
                {
                  message: `We are not able to complete ticketing for ${controlNumber}`,
                },
              ],
              supplierError,
            });
          }
        } else {
          res.status(400).json({
            errors: [
              {
                message: 'We are not able to create a reservation currently',
              },
            ],
          });
        }
      } catch (error) {
        let supplierError = null;
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.data
        ) {
          supplierError = error.response.data;
        }
        res.status(400).json({
          errors: [
            {
              message: 'We are not able to create a reservation',
            },
          ],
          supplierError,
        });
      }
    }
  } catch (error) {
    console.log('error => ', error);
    res.status(400).json({
      errors: [
        {
          message: 'We are not able to create a reservation currently',
        },
      ],
    });
  }
}
