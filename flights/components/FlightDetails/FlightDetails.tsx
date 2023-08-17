import { IconWrapper, Paragraph } from '@simplenight/ui';
import React, { ReactNode } from 'react';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';
import { formatDate } from 'flights/utils';

interface FlightDetailsProps {
  departure: string;
  departureDate: string;
  arrival: string;
  arrivaDate: string;
  type: string;
  icon: ReactNode;
}
const FlightDetails = ({
  departure,
  arrival,
  departureDate,
  arrivaDate,
  type,
  icon,
}: FlightDetailsProps) => {
  const departureFormatDate = formatDate(departureDate);
  const arrivaFormatDate = formatDate(arrivaDate);
  return (
    <div className="flex gap-2 items-center px-4 md:px-0">
      <section className="flex gap-1 items-center">
        <Paragraph size="small" fontWeight="semibold">
          {departure}
        </Paragraph>
        <IconWrapper size={16}>{icon}</IconWrapper>
        <Paragraph size="small" fontWeight="semibold">
          {arrival}
        </Paragraph>
      </section>
      <section>
        <Paragraph size="small" fontWeight="semibold">
          · {departureFormatDate}{' '}
          {departureFormatDate !== arrivaFormatDate
            ? `to ${arrivaFormatDate}`
            : ''}
        </Paragraph>
      </section>

      <section className="hidden md:block">
        <Paragraph size="small" fontWeight="semibold">
          · {type}
        </Paragraph>
      </section>
    </div>
  );
};

export default FlightDetails;
