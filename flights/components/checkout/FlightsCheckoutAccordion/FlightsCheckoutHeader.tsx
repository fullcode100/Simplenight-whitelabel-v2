import { Heading, IconWrapper, Paragraph } from '@simplenight/ui';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useFlights } from 'flights/hooks/useFlights/useFlights';

const FlightsCheckoutHeader = () => {
  const { flightInfo } = useFlights();
  const ticketsLabel = usePlural(flightInfo.totalTickets, 'Ticket', 'Tickets');

  return (
    <section className="flex flex-row gap-3 p-4">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">
          <FlightsIcon className={'h-5 w-5'} />
        </div>
      </IconRoundedContainer>
      <section>
        <section className="flex flex-row gap-1">
          <Heading tag="h5">{flightInfo.startAirport}</Heading>
          <IconWrapper size={20}>{flightInfo.directionIcon}</IconWrapper>
          <Heading tag="h5">{flightInfo.endAirport}</Heading>
        </section>
        <Paragraph size="small" textColor="text-dark-800">
          {flightInfo.directionLabel} | {flightInfo.totalTickets} {ticketsLabel}
        </Paragraph>
      </section>
    </section>
  );
};

export default FlightsCheckoutHeader;
