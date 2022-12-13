// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { FlightCategory } from 'flights';
import {
  Flight,
  FlightSearchResponse,
} from 'flights/types/response/SearchResponse';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlightSearchResponse>,
) {
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
  const currency = req.query?.currency
    ? (req.query?.currency as string)
    : 'USD';
  const lang = req.query?.lang ? (req.query?.lang as string) : 'EN';

  const direction = req.query?.direction ? req.query?.direction : 'round_trip';
  let itenDetails;
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
      ? req.query?.start_airports.toString().split('|')
      : [];
    const endAirports = req.query?.end_airports
      ? req.query?.end_airports.toString().split('|')
      : [];
    const startDates = req.query?.start_dates
      ? req.query?.start_dates.toString().split('|')
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
      currency: currency,
    };
    const getData = {
      lang: lang,
      currency: currency,
      rsp_fields_set: 'extended',
      inventory_ids:
        '8a577205:5010SYDNEY,c200dbea:5010SYDNEY,87e87a73:5010SYDNEY,f4570ee8:5010SYDNEY',
    };
    const url = `https://dev-api.simplenight.com/v2/categories/flights/items/details?${new URLSearchParams(
      getData,
    )}`; // SN
    // 'https://dev.jarnetsolutions.com/sn-booking-service/airsearch', // Amadeus
    // 'https://dev.jarnetsolutions.com/sn-booking-service/findbargain', // SABRE

    console.log('URL', url);
    console.log('REQUEST', JSON.stringify(postData));

    const { data } = await axios.post(url, postData, {
      headers: {
        Accept: 'application/json',
        'X-API-KEY': '4I8FoZk7.Vtj5lDdPzv1vharxEzwp5gooD6nl1TXo',
      },
    });

    console.log('RESPONSE', data);

    // if (data?.pricedItineraries?.pricedItinerary) // SABRE
    if (
      data &&
      data.data &&
      data.data.items &&
      data.data.items[0] &&
      data.data.items[0]._legCollection &&
      data.data.items[0]._legCollection._collection &&
      data.data.items[0]._offersCollection &&
      data.data.items[0]._offersCollection.offerLegRefs
    ) {
      // Amadeus
      const flights = data.data.items[0]._legCollection._collection;
      const offers = data.data.items[0]._offersCollection.offerLegRefs;
      flights.forEach((item: Flight, index: number) => {
        flights[index].offers = [];
      });
      res.status(200).json({
        flights: flights,
        offers: offers,
      }); // Amadeus
      // .json({ flights: data?.pricedItineraries?.pricedItinerary }); // SABRE
    } else res.status(400).json({ flights: [], offers: [] });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log('error message: ', error.message);
      res.status(400).json({ flights: [], offers: [] });
    } else {
      // console.log('unexpected error: ', error);
      res.status(400).json({ flights: [], offers: [] });
    }
  }
}
