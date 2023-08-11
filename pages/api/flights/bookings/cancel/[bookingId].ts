import type { NextApiResponse } from 'next';
import axios from 'axios';
import {
  applySimplenightApiKey,
  setSession,
} from 'apiCalls/config/middlewares/authHeaderMiddleware';
import { NextApiRequestWithSession } from 'types/core/server';
import { createServerAxiosInstance } from 'apiCalls/config/axiosHelper';

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
    return res.status(500).json({
      errors: [{ message: 'Cancel reservation failed', error: 'Axios failed' }],
    });
  }

  try {
    const { body } = req;

    const { bookingId } = req.query;

    if (bookingId) {
      const { data } = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/reservation/${bookingId}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!data) throw new Error('Flight cancellation error');
      return res.status(200).json({ ...data });
    }

    return res.status(500).json({
      errors: [
        {
          message: 'Cancel reservation failed',
          error: 'bookingId query param is missing',
        },
      ],
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ booking: {} });
    } else {
      res.status(500).json({ booking: {} });
    }
  }
}
