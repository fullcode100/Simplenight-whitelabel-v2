import { IconWrapper, Paragraph } from '@simplenight/ui';
import React from 'react';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';
import { getAirlineIconUrl } from 'flights/utils';

interface FlightInfoProps {
  airline?: string;
  departure: string;
  arrival: string;
}
const FlightInfo = ({ airline, departure, arrival }: FlightInfoProps) => {
  return (
    <div className="flex gap-1 items-center">
      {airline && (
        <img className="h-3.5" src={getAirlineIconUrl(airline)} alt={airline} />
      )}

      <Paragraph fontWeight="semibold">{departure}</Paragraph>
      <IconWrapper size={16}>
        <ArrowRight />
      </IconWrapper>
      <Paragraph fontWeight="semibold">{arrival}</Paragraph>
    </div>
  );
};

export default FlightInfo;
