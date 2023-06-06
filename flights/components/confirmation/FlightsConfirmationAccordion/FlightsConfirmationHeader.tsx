import { Heading, IconWrapper, Paragraph } from '@simplenight/ui';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import { useTranslation } from 'react-i18next';
import IconMultiCity from 'public/icons/assets/flights/multicity.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { Item } from 'types/booking/bookingType';

interface Props {
  item?: Item;
}

const FlightsConfirmationHeader = ({ item }: Props) => {
  const [t] = useTranslation('flights');
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

  const adults = item?.item_data.booking.passengers.filter(
    (v: any) => v.type === 'ADT',
  ).length;
  const children = item?.item_data.booking.passengers.filter(
    (v: any) => v.type === 'CNN',
  ).length;
  const infants = item?.item_data.booking.passengers.filter(
    (v: any) => v.type === 'INF',
  ).length;

  const passengers = adults + children + infants;
  const ticketsLabel = usePlural(passengers, 'Ticket', 'Tickets');

  const direction =
    item?.item_data.booking.segments.lenght === 1 ? 'one_way' : 'round_trip';
  const flights = item?.item_data.booking.segments;
  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];
  const startAirport = firstFlight.collection[0].departureAirport;
  const endAirport = lastFlight.collection[0].arrivalAirport;

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
          {directionMapper[direction].label} | {passengers} {ticketsLabel}
        </Paragraph>
      </section>
    </section>
  );
};

export default FlightsConfirmationHeader;
