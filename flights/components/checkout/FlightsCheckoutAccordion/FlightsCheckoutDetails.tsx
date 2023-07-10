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

const FlightsCheckoutDetails = ({ flights }: { flights: FlightItem[] }) => {
  const [t] = useTranslation('flights');
  const departureLabel = t('departure', 'Departure');
  const arrivalLabel = t('return', 'Return');
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

  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];

  return (
    <div className="p-4 border-y border-dark-300">
      <div className="block lg:hidden space-y-4">
        <MobileFlightInfo
          title={departureLabel}
          date={formatDateTime(
            firstFlight.segments.collection[0].departureDateTime,
          )}
          fare={firstFlight.offer.cabinName}
        />
        <MobileFlightInfo
          title={arrivalLabel}
          date={formatDateTime(
            lastFlight.segments.collection[
              lastFlight.segments.collection.length - 1
            ].departureDateTime,
          )}
          fare={lastFlight.offer.cabinName}
        />
      </div>
      <div className="hidden lg:block space-y-4">
        <table className="w-full">
          <thead className="text-dark-700">
            <th className="text-left pl-4">Cities</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th className="text-right">Fare</th>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.legId}>
                <td>
                  <div className="flex items-center gap-1">
                    <FlightIcon className="text-primary-700" />
                    <Paragraph size="xs" fontWeight="semibold">
                      {flight.segments.collection[0].departureAirport}
                    </Paragraph>
                    <IconWrapper size={16}>
                      <ArrowRight />
                    </IconWrapper>
                    <Paragraph size="xs" fontWeight="semibold">
                      {
                        flight.segments.collection[
                          flight.segments.collection.length - 1
                        ].arrivalAirport
                      }
                    </Paragraph>
                  </div>
                </td>
                <td>
                  <Paragraph
                    size="xs"
                    fontWeight="semibold"
                    className="text-center"
                  >
                    {formatDateTime(
                      flight.segments.collection[0].departureDateTime,
                    )}
                  </Paragraph>
                </td>
                <td>
                  <Paragraph
                    size="xs"
                    fontWeight="semibold"
                    className="text-center"
                  >
                    {formatDateTime(
                      flight.segments.collection[
                        flight.segments.collection.length - 1
                      ].arrivalDateTime,
                    )}
                  </Paragraph>
                </td>
                <td className="text-right">{flight.offer.cabinName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsCheckoutDetails;
