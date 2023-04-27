import { Heading, IconWrapper, Paragraph } from '@simplenight/ui';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import { useTranslation } from 'react-i18next';
import IconMultiCity from 'public/icons/assets/flights/multi_city.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import { Search } from 'hooks/flights/useSearchStore';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface Props {
  flight: Flight;
  search: Search;
}

const FlightsCheckoutHeader = ({ flight, search }: Props) => {
  const [t] = useTranslation('flights');
  const { adults, infants, children, direction, startAirport, endAirport } =
    search;
  const directionMapper = {
    one_way: {
      icon: <IconOneWay />,
      label: t('one_way', 'One-way'),
    },
    multi_city: {
      icon: <IconMultiCity />,
      label: t('multi_city', 'Multi-city'),
    },
    round_trip: {
      icon: <IconRoundTrip />,
      label: t('round_trip', 'Round-Trip'),
    },
  };

  const passengers = Number(adults) + Number(children) + Number(infants);
  const ticketsLabel = usePlural(passengers, 'Ticket', 'Tickets');

  return (
    <section className="flex flex-row gap-3">
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

export default FlightsCheckoutHeader;
