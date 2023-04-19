import { IconWrapper, Paragraph } from '@simplenight/ui';
import React from 'react';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';

interface FlightDetailsProps {
  departure: string;
  arrival: string;
  dateTime: string;
  type: string;
}
const FlightDetails = ({
  departure,
  arrival,
  dateTime,
  type,
}: FlightDetailsProps) => {
  return (
    <div className="flex gap-2 items-center">
      <section className="flex gap-2 items-center">
        <Paragraph size="small" fontWeight="semibold">
          {departure}
        </Paragraph>
        <IconWrapper size={16}>
          <ArrowRight />
        </IconWrapper>
        <Paragraph size="small" fontWeight="semibold">
          {arrival}
        </Paragraph>
      </section>
      &bull;
      <section>
        <Paragraph size="small" fontWeight="semibold">
          {dateTime}
        </Paragraph>
      </section>
      &bull;
      <section>
        <Paragraph size="small" fontWeight="semibold">
          {type}
        </Paragraph>
      </section>
    </div>
  );
};

export default FlightDetails;
