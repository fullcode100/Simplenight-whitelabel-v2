import { Heading, IconWrapper, Paragraph } from '@simplenight/ui';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import FlightsIcon from 'public/icons/categories/Category-Flights.svg';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import { useTranslation } from 'react-i18next';
import IconMultiCity from 'public/icons/assets/flights/multi_city.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import { Flight } from 'flights/types/response/FlightSearchResponse';

const FlightsCheckoutHeader = ({ flight }: { flight: Flight }) => {
  const [t] = useTranslation('flights');
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

  const startAirport = flight.departure.iata_code;
  const endAirport = flight.arrival.iata_code;

  // TODO: Replace mocked data

  const direction = 'one_way';
  // should be updated once valdimirs pr is ready

  const passengers = 2;
  // should be updated once alejandros pr which saves passenger info in zustand is done

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
          {directionMapper[direction].label} | {passengers} Tickets
        </Paragraph>
      </section>
    </section>
  );
};

export default FlightsCheckoutHeader;
