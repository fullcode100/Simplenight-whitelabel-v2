// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { NextApiRequestWithSession } from 'types/core/server';
import {
  FlightItem,
  FlightResponse,
  FlightsSearchResponseMS,
  OfferLegRefsEntity,
} from 'flights/types/response/FlightSearchResponseMS';
import { FLIGHT_DEBUG } from 'flights';

const getPlaceType = (place: string) => {
  if (place === 'AIRPORT') {
    return 'A';
  } else if (place === 'CITY') {
    return 'C';
  } else {
    return null;
  }
};

const MAX_OFFERS = 100;
export default async function handler(
  req: NextApiRequestWithSession,
  res: NextApiResponse<FlightResponse>,
) {
  const placeType = getPlaceType(req.query?.place_type as string);
  const placeType2 = getPlaceType(req.query?.place_type2 as string);
  // TODO: Add validation
  const passenger = [];
  const adults = req.query?.adults ? Number(req.query?.adults) : 1;
  for (let i = 0; i < adults; i += 1) {
    passenger.push({ id: `${i + 1}`, type: 'ADT' });
  }
  const children = req.query?.children ? Number(req.query?.children) : 0;
  for (let i = 0; i < children; i += 1) {
    passenger.push({ id: `${adults + i + 1}`, type: 'CNN' });
  }
  const infants = req.query?.infants ? Number(req.query?.infants) : 0;
  for (let i = 0; i < infants; i += 1) {
    passenger.push({ id: `${i + 1}.1`, type: 'INF' });
  }
  const currency = req.query?.currency
    ? (req.query?.currency as string)
    : 'USD';
  const lang = req.query?.lang ? (req.query?.lang as string) : 'EN';

  const direction =
    typeof req.query?.direction === 'string' ? req.query.direction : '';
  let itemDetails;
  if (direction === 'one_way') {
    itemDetails = [
      {
        from: req.query?.start_airport as string,
        to: req.query?.end_airport as string,
        toAirportCityQualifier: placeType,
        departureDate: req.query?.start_date,
        fromAirportCityQualifier: placeType2,
        direction: 'outbound',
      },
    ];
  } else if (direction === 'round_trip') {
    itemDetails = [
      {
        from: req.query?.start_airport as string,
        to: req.query?.end_airport as string,
        toAirportCityQualifier: placeType,
        departureDate: req.query?.start_date,
        fromAirportCityQualifier: placeType2,
        direction: 'outbound',
      },
      {
        from: req.query?.end_airport as string,
        fromAirportCityQualifier: placeType2,
        to: req.query?.start_airport as string,
        toAirportCityQualifier: placeType,
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
    itemDetails = [];
    startAirports.forEach((item: string, index: number) => {
      if (startAirports[index] && endAirports[index] && startDates[index]) {
        itemDetails.push({
          from: startAirports[index],
          fromAirportCityQualifier: 'A', // TODO: Change it
          to: endAirports[index],
          departureDate: startDates[index],
          toAirportCityQualifier: 'A', // TODO: Change it
          direction: 'outbound',
        });
      }
    });
  }

  let cabinType = 'economy';
  const queryParamCabinType = req.query?.cabin_type?.toString();
  if (
    ['economy', 'premium_economy', 'business', 'first_class'].includes(
      queryParamCabinType,
    )
  ) {
    cabinType = queryParamCabinType;
  }

  const postData = {
    passengers: passenger,
    airTravel: {
      direction: direction,
      cabin: {
        economy: cabinType === 'economy',
        premium_economy: cabinType === 'premium_economy',
        business: cabinType === 'business',
        first: cabinType === 'first_class',
      },
      itemDetails: itemDetails,
      excludeLCC: true,
    },
    currency: currency,
    maxOffers: MAX_OFFERS,
  };

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(postData),
  };

  try {
    const rawResults = await fetch(
      `${process.env.NEXT_PUBLIC_FLIGHTS_MS}/sn-booking-service/airsearch`,
      requestOptions,
    );
    const response: FlightsSearchResponseMS = await rawResults.json();

    const flights = response?._legCollection._collection;
    const offers = response?._offersCollection.offerLegRefs;

    if (rawResults.ok && flights && offers) {
      const IdWithPrices =
        offers?.reduce((acum, offer) => {
          const references = offer?.legRef;

          references?.forEach((legId) => {
            if (legId && !acum[legId]) {
              acum[legId] = [];
            }

            acum[legId].push(offer);
          });

          return acum;
        }, {} as { [n: string]: Array<OfferLegRefsEntity> }) || {};

      const resultFlights = flights
        ?.filter((current) => IdWithPrices[current.legId])
        .reduce((acum, current) => {
          const id = Number(current.legId[0]) - 1;
          if (!acum[id]) {
            acum[id] = [];
          }
          const offersList = IdWithPrices[current.legId];
          if (id === 0) {
            acum[id].push({ ...current, offer: offersList[0] });
          } else {
            offersList.forEach((offerItem) => {
              acum[id].push({ ...current, offer: offerItem });
            });
          }

          return acum;
        }, [] as Array<Array<FlightItem>>);

      const data = resultFlights.map((flightList, idx) => {
        const nextFlightList = resultFlights[idx + 1];
        if (nextFlightList) {
          return flightList.filter((flight) => {
            const legId = flight.legId;
            const legIdList: string[] = [];
            nextFlightList.forEach((val) => {
              const newData = val.offer.legRef || [];
              legIdList.push(...newData);
            });
            const dataList = new Set(legIdList);
            return Array.from(dataList).includes(legId);
          });
        }
        return flightList;
      });

      res.status(200).json({
        flights: data,
        supplier: FLIGHT_DEBUG ? response : null,
      });
    } else {
      res.status(500).json({
        errors: 'Something went wrong',
      });
    }
  } catch (e) {
    res.status(500).json({
      errors: 'Something went wrong',
    });
  }
}
