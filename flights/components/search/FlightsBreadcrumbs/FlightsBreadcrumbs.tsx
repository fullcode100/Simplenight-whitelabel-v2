import { IconWrapper, Paragraph } from '@simplenight/ui';
import React from 'react';
import ArrowRight from 'public/icons/assets/flights/arrow_right-short.svg';
import { Flight } from 'flights/types/response/SearchResponse';
import { getAirlineIconUrl } from 'flights/utils';
import { Stepper } from './components/Stepper';
import classnames from 'classnames';
import useScrollDirection from 'hooks/layoutAndUITooling/useScrollDirection';
import ChevronRight from 'public/icons/assets/chevron-right.svg';

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

interface BreadCrumbProps {
  selectedFlights: Flight[];
}
const FlightsBreadcrumbs = ({ selectedFlights }: BreadCrumbProps) => {
  const scrollDirection = useScrollDirection();
  return (
    <section
      className={classnames(
        'hidden lg:flex w-full fixed left-0 bg-primary-100 h-16 items-center justify-between z-10 transition-all duration-500 px-20',
        scrollDirection === 'down' ? 'top-[272px]' : 'top-[316px]',
      )}
    >
      <section className="flex w-full items-center justify-between max-w-7xl mx-auto">
        <section className="flex items-center gap-6">
          {selectedFlights.map((flight, idx) => {
            const flightSegments = flight.segments.collection;
            const firstSegment = flightSegments[0];
            const lastSegment = flightSegments[flightSegments.length - 1];
            const airline = firstSegment.marketingCarrier;
            const departure = firstSegment.departureAirport;
            const arrival = lastSegment.arrivalAirport;
            const isLastFlight = idx === selectedFlights.length - 1;
            return (
              <>
                <FlightInfo
                  key={flight.legId}
                  airline={airline}
                  departure={departure}
                  arrival={arrival}
                />
                {!isLastFlight && (
                  <IconWrapper size={20}>
                    <ChevronRight className="text-dark-500" />
                  </IconWrapper>
                )}
              </>
            );
          })}
        </section>
        <Stepper />
      </section>
    </section>
  );
};

export default FlightsBreadcrumbs;
