// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AirportResponse } from 'flights/types/response/AirportResponse';
import { airportsAdapter } from 'flights/adapters/airports.adapter';
import { AirportsMsResponse } from 'flights/types/response/AirportMSResponse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AirportResponse>,
) {
  try {
    const { keyword } = req.query;

    const response = await axios.get<AirportsMsResponse>(
      'http://api-tst.simplenight.com/v1/airports',
      {
        params: { keyword, subType: 'AIRPORT,CITY' },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const data = airportsAdapter(response.data);

    if (!data) throw new Error('Airports service error');
    res.status(200).json({ data: data?.data || [] });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(500).json({ data: [] });
    } else {
      res.status(500).json({ data: [] });
    }
  }
}
