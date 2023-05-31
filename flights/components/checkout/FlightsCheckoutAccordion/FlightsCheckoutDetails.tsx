import React from 'react';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import CalendarIcon from 'public/icons/assets/calendar.svg';
import dayjs from 'dayjs';

import { Paragraph } from '@simplenight/ui';
import SeatIcon from 'public/icons/assets/flights/seat.svg';
import { useTranslation } from 'react-i18next';

const FlightsCheckoutDetails = ({ flights }: { flights: FlightItem[] }) => {
  const formatDate = (date: string) => {
    return (
      dayjs(date).tz('America/New_York').format('MM/DD/YY hh:mm A') + ' EST'
    );
  };

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
          date={formatDate(
            firstFlight.segments.collection[0].departureDateTime,
          )}
          fare={'Classic Fare'}
        />
        <MobileFlightInfo
          title={arrivalLabel}
          date={formatDate(
            lastFlight.segments.collection[
              lastFlight.segments.collection.length - 1
            ].departureDateTime,
          )}
          fare={'Classic Fare'}
        />
      </div>
    </div>
  );
};

export default FlightsCheckoutDetails;
