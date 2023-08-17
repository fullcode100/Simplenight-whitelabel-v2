import React from 'react';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import dayjs from 'dayjs';

import { IconWrapper, Paragraph } from '@simplenight/ui';
import SeatIcon from 'public/icons/assets/flights/seat.svg';
import { useTranslation } from 'react-i18next';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';
import FlightIcon from 'public/icons/assets/flights.svg';
import { formatDateTime } from '../../../utils/index';
import { useFlights } from 'flights/hooks/useFlights/useFlights';

const FlightsCheckoutDetails = () => {
  const {
    flights,
    flightInfo,
    getFirstDepartureAirport,
    getFirstDepartureDateTime,
    getLastArrivalAirport,
    getLastArrivalDateTime,
    getOfferCabinName,
  } = useFlights();
  const [t] = useTranslation('flights');
  const departureLabel = t('departure', 'Departure');
  const returnLabel = t('return', 'Return');
  const citiesLabel = t('cities', 'Cities');
  const arrivalLabel = t('arrival', 'Arrival');
  const fareLabel = t('fare', 'Fare');
  const MobileFlightInfo = ({
    title,
    fare,
    date,
  }: {
    title: string;
    fare: string;
    date: string;
  }) => {
    return (
      <div className="space-y-1 ">
        <Paragraph
          fontWeight="semibold"
          textColor="text-dark-700"
          className="pl-5"
        >
          {title}
        </Paragraph>
        <div className="flex gap-1 items-center">
          <CalendarIcon className="h-4 w-4 text-primary-600" />
          <Paragraph>{date}</Paragraph>
        </div>
        <div className="flex gap-1 items-center">
          <SeatIcon className="h-4 w-4 text-primary-600" />
          <Paragraph>{fare}</Paragraph>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 border-y border-dark-300">
      <div className="block lg:hidden space-y-4">
        <MobileFlightInfo
          title={departureLabel}
          date={formatDateTime(flightInfo.startDateTime)}
          fare={flightInfo.startCabinName}
        />
        <MobileFlightInfo
          title={returnLabel}
          date={formatDateTime(flightInfo.endDateTime)}
          fare={flightInfo.endCabinName}
        />
      </div>
      <div className="hidden lg:block space-y-4">
        <table className="w-full">
          <thead className="text-dark-700">
            <th className="text-left pl-4">{citiesLabel}</th>
            <th>{departureLabel}</th>
            <th>{arrivalLabel}</th>
            <th className="text-right">{fareLabel}</th>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.legId}>
                <td>
                  <div className="flex items-center gap-1">
                    <FlightIcon className="text-primary-700" />
                    <Paragraph size="xs" fontWeight="semibold">
                      {getFirstDepartureAirport(flight.segments)}
                    </Paragraph>
                    <IconWrapper size={16}>
                      <ArrowRight />
                    </IconWrapper>
                    <Paragraph size="xs" fontWeight="semibold">
                      {getLastArrivalAirport(flight.segments)}
                    </Paragraph>
                  </div>
                </td>
                <td>
                  <Paragraph
                    size="xs"
                    fontWeight="semibold"
                    className="text-center"
                  >
                    {formatDateTime(getFirstDepartureDateTime(flight.segments))}
                  </Paragraph>
                </td>
                <td>
                  <Paragraph
                    size="xs"
                    fontWeight="semibold"
                    className="text-center"
                  >
                    {formatDateTime(getLastArrivalDateTime(flight.segments))}
                  </Paragraph>
                </td>
                <td className="text-right">{getOfferCabinName(flight)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsCheckoutDetails;
