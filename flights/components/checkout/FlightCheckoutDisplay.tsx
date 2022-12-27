import { useTranslation } from 'react-i18next';

import Paragraph from 'components/global/Typography/Paragraph';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import IconOneWay from 'public/icons/assets/flights/one_way.svg';
import IconRoundTrip from 'public/icons/assets/flights/round_trip.svg';
import IconMultiCity from 'public/icons/assets/flights/multi_city.svg';

import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';

interface FlightCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const FlightCheckoutDisplay = ({
  item,
  Category,
}: FlightCheckoutDisplayProps) => {
  const [t, i18n] = useTranslation('flights');

  let startDates: string[] = [];
  let startAirports: string[] = [];
  let endAirports: string[] = [];
  const direction = item?.booking_data?.search?.direction;
  let directionLabel = t('one_way', 'One-way');
  if (direction === 'round_trip')
    directionLabel = t('round_trip', 'Round-trip');
  else if (direction === 'multi_city') {
    directionLabel = t('multi_city', 'Multi-city');
    startDates = (item?.booking_data?.search?.start_dates as string).split(',');
    startAirports = (
      item?.booking_data?.search?.start_airports as string
    ).split(',');
    endAirports = (item?.booking_data?.search?.end_airports as string).split(
      ',',
    );
  }

  const travelers =
    (item?.booking_data?.search?.adults ?? 1) +
    (item?.booking_data?.search?.children ?? 0) +
    (item?.booking_data?.search?.infants ?? 0);
  const travelerText = t('traveler', 'Traveler');
  const travelersText = t('travelers', 'Travelers');
  const travelersFormatted = `${travelers} ${usePlural(
    travelers,
    travelerText,
    travelersText,
  )}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{Category.icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 text-[20px] leading-[20px]">
          {direction === 'one_way' && (
            <section className="flex flex-row">
              {item?.booking_data?.search?.start_airport}
              <IconOneWay className="mx-2 text-dark-1000" />
              {item?.booking_data?.search?.end_airport}
            </section>
          )}
          {direction === 'round_trip' && (
            <section className="flex flex-row">
              {item?.booking_data?.search?.start_airport}
              <IconRoundTrip className="mx-2 text-dark-1000" />
              {item?.booking_data?.search?.end_airport}
            </section>
          )}
          {direction === 'multi_city' && (
            <section className="flex flex-row">
              {startAirports[0]}
              <IconMultiCity className="mx-2 text-dark-1000" />
              {endAirports[endAirports.length - 1]}
            </section>
          )}
        </section>
        <section className="font-normal text-dark-700 text-[14px] leading-[17px]">
          {directionLabel} | {travelersFormatted}
        </section>
      </section>
    </section>
  );
};

export default FlightCheckoutDisplay;
