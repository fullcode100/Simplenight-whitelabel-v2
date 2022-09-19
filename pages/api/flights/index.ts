// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { FlightCategory } from 'flights';
import { Flight } from 'flights/types/response/SearchResponse';
import axios from 'axios';

type Data = {
  flights: Flight[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Temporary, until SN api/v2/flights is implemented
  const passenger = [];
  const adults = req.query?.adults ? Number(req.query?.adults) : 1;
  for (let i = 0; i < adults; i += 1) {
    passenger.push({ id: `${i + 1}.0`, code: 'ADT' });
  }
  const children = req.query?.children ? Number(req.query?.children) : 0;
  for (let i = 0; i < children; i += 1) {
    passenger.push({ id: `${adults + i + 1}.0`, code: 'CHD' }); // CNN
  }
  const infants = req.query?.infants ? Number(req.query?.infants) : 0;
  for (let i = 0; i < infants; i += 1) {
    passenger.push({ id: `1.${i + 1}`, code: 'INF' });
  }

  const direction = req.query?.direction ? req.query?.direction : 'round_trip';
  let itenDetails = [];
  if (direction === 'one_way') {
    itenDetails = [
      {
        from: req.query?.start_airport as string,
        to: req.query?.end_airport as string,
        departureDate: req.query?.start_date,
        direction: 'outbound',
      },
    ];
  } else if (direction === 'round_trip') {
    itenDetails = [
      {
        from: req.query?.start_airport as string,
        to: req.query?.end_airport as string,
        departureDate: req.query?.start_date,
        direction: 'outbound',
      },
      {
        from: req.query?.end_airport as string,
        to: req.query?.start_airport as string,
        departureDate: req.query?.end_date,
        direction: 'inbound',
      },
    ];
  } else if (direction === 'multi_city') {
    const startAirports = req.query?.start_airports
      ? req.query?.start_airports.split('|')
      : [];
    const endAirports = req.query?.end_airports
      ? req.query?.end_airports.split('|')
      : [];
    const startDates = req.query?.start_dates
      ? req.query?.start_dates.split('|')
      : [];
    itenDetails = [];
    startAirports.forEach((item: string, index: number) => {
      if (startAirports[index] && endAirports[index] && startDates[index]) {
        itenDetails.push({
          from: startAirports[index],
          to: endAirports[index],
          departureDate: startDates[index],
          direction: 'outbound',
        });
      }
    });
  }

  try {
    const postData = {
      passenger: passenger,
      airTravel: {
        direction: direction,
        cabin: {
          economy: true,
          business: true,
          first: true,
        },
        itenDetails: itenDetails,
      },
    };
    console.log('postData', JSON.stringify(postData));
    const { data } = await axios.post(
      'https://dev.jarnetsolutions.com/sn-booking-service/findbargain',
      postData,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (data?.pricedItineraries?.pricedItinerary)
      res
        .status(200)
        .json({ flights: data?.pricedItineraries?.pricedItinerary });
    else res.status(400).json({ flights: [] });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log('error message: ', error.message);
      res.status(400).json({ flights: [] });
    } else {
      // console.log('unexpected error: ', error);
      res.status(400).json({ flights: [] });
    }
  }
}
