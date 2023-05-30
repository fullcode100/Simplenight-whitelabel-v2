import { IconWrapper, Paragraph } from '@simplenight/ui';
import React, { MouseEvent } from 'react';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';
import { getAirlineIconUrl } from 'flights/utils';

interface FlightInfoProps {
  airline?: string;
  departure: string;
  arrival: string;
  onClick?: (event?: MouseEvent<HTMLElement>) => void;
}
const FlightInfo = ({
  airline,
  departure,
  arrival,
  onClick,
}: FlightInfoProps) => {
  return (
    <div className="flex gap-1 items-center cursor-pointer" onClick={onClick}>
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
