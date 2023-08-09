import { Heading, IconWrapper, Paragraph } from '@simplenight/ui';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import { useTranslation } from 'react-i18next';
import IconMultiCity from 'public/icons/assets/flights/multicity.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import { Search } from 'hooks/flights/useSearchStore';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { IPassenger } from 'flights/components/passenger/inputs';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';

interface Props {
  flights: FlightItem[];
  passengers: IPassenger[];
}

const FlightsCheckoutHeader = ({ passengers, flights }: Props) => {
  const [t] = useTranslation('flights');
  // const { adults, infants, children, direction, startAirport, endAirport } =
  //   search;
  const adults = passengers.filter(
    (v: any) => v.passengerType === 'ADT',
  ).length;
  const children = passengers.filter(
    (v: any) => v.passengerType === 'CNN',
  ).length;
  const infants = passengers.filter(
    (v: any) => v.passengerType === 'INF',
  ).length;
  const directionMapper = {
    one_way: {
      icon: <IconOneWay />,
      label: t('one_way', 'One-way'),
    },
    multicity: {
      icon: <IconMultiCity />,
      label: t('multicity', 'Multi-city'),
    },
    round_trip: {
      icon: <IconRoundTrip />,
      label: t('round_trip', 'Round-Trip'),
    },
  };

  const totalTickets = Number(adults) + Number(children) + Number(infants);
  const ticketsLabel = usePlural(totalTickets, 'Ticket', 'Tickets');

  const direction = flights.length === 1 ? 'one_way' : 'round_trip';

  const firstFlight = flights[0].segments;
  const lastFlight = flights[flights.length - 1].segments;
  const startAirport = firstFlight.collection[0].departureAirport;
  const endAirport =
    direction === 'round_trip'
      ? lastFlight.collection[0].departureAirport
      : lastFlight.collection[0].arrivalAirport;

  return (
    <section className="flex flex-row gap-3 p-4">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">
          <FlightsIcon className={'h-5 w-5'} />
        </div>
      </IconRoundedContainer>
      <section>
        <section className="flex flex-row gap-1">
          <Heading tag="h5">{startAirport}</Heading>
          <IconWrapper size={20}>{directionMapper[direction].icon}</IconWrapper>
          <Heading tag="h5">{endAirport}</Heading>
        </section>
        <Paragraph size="small" textColor="text-dark-800">
          {directionMapper[direction].label} | {totalTickets} {ticketsLabel}
        </Paragraph>
      </section>
    </section>
  );
};

export default FlightsCheckoutHeader;
