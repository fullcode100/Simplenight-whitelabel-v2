// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const defaultErrorMsg = 'Something went wrong, please try again';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { body } = req;
    const { data, status } = await axios.post(
      `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/reservation/price`,
      body,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    if (data && data.errorMessage === null) {
      res.status(200).json({ ...data });
      return;
    } else if (data && data.errorMessage) {
      throw new Error(data.errorMessage.error);
    } else if (status !== 200) {
      throw new Error(defaultErrorMsg);
    }
    res.status(200).json({ isValid: true });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status as number).json({
        errors: [{ message: error.message }],
      });
    } else {
      let message = defaultErrorMsg;
      if (error instanceof Error) {
        message = error.message;
      }
      res.status(500).json({
        errors: [{ message }],
      });
    }
  }
}
