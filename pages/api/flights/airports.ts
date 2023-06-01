// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AirportResponse } from 'flights/types/response/AirportResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AirportResponse>,
) {
  try {
    const { keyword } = req.query;

    const { data } = await axios.get<AirportResponse>(
      'http://api-test.simplenight.com/v1/airports',
      {
        params: { keyword, subType: 'AIRPORT,CITY' },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!data) throw new Error('Airports service error');
    res.status(200).json({ data: data?.data || [] });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(400).json({ data: [] });
    } else {
      res.status(400).json({ data: [] });
    }
  }
}
