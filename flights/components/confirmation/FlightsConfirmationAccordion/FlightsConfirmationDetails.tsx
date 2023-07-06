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
import { Item } from 'types/booking/bookingType';

const FlightsConfirmationDetails = ({ item }: { item?: Item }) => {
  const [t] = useTranslation('flights');
  const departureLabel = t('departure', 'Departure');
  const arrivalLabel = t('arrival', 'Arrival');
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
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4 text-primary-600" />
          <Paragraph>{date}</Paragraph>
        </div>
        <div className="flex items-center gap-1">
          <SeatIcon className="w-4 h-4 text-primary-600" />
          <Paragraph>{fare}</Paragraph>
        </div>
      </div>
    );
  };

  const offer = item?.item_data.booking.offer;
  const flights = item?.item_data.booking.segments;
  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];

  return (
    <div className="p-4 border-y border-dark-300">
      <div className="block space-y-4 lg:hidden">
        <MobileFlightInfo
          title={departureLabel}
          date={formatDateTime(firstFlight.collection[0].departureDateTime)}
          fare={offer?.cabinName}
        />
        <MobileFlightInfo
          title={arrivalLabel}
          date={formatDateTime(
            lastFlight.collection[lastFlight.collection.length - 1]
              .departureDateTime,
          )}
          fare={lastFlight.offer?.cabinName}
        />
      </div>
      <div className="hidden space-y-4 lg:block">
        <table className="w-full">
          <thead className="text-dark-700">
            <th className="pl-4 text-left">Cities</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th className="text-right">Fare</th>
          </thead>
          <tbody>
            {flights.map((flight: any) => (
              <tr key={flight.legId}>
                <td>
                  <div className="flex items-center gap-1">
                    <FlightIcon className="text-primary-700" />
                    <Paragraph size="xs" fontWeight="semibold">
                      {flight.collection[0].departureAirport}
                    </Paragraph>
                    <IconWrapper size={16}>
                      <ArrowRight />
                    </IconWrapper>
                    <Paragraph size="xs" fontWeight="semibold">
                      {
                        flight.collection[flight.collection.length - 1]
                          .arrivalAirport
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
                    {formatDateTime(flight.collection[0].departureDateTime)}
                  </Paragraph>
                </td>
                <td>
                  <Paragraph
                    size="xs"
                    fontWeight="semibold"
                    className="text-center"
                  >
                    {formatDateTime(flight.collection[0].arrivalDateTime)}
                  </Paragraph>
                </td>
                <td className="text-right">{offer?.cabinName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightsConfirmationDetails;
