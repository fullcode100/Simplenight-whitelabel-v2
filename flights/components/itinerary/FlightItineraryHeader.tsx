import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { Item } from 'types/cart/CartType';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface FlightItineraryHeaderProps {
  item: Item;
  icon: ReactElement;
}

const FlightItineraryHeader = ({ item, icon }: FlightItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('flights');

  const flightName = item.extended_data?.details?.name;
  const roomsAmount = item.room_qty ?? 1;
  const roomText = t('room', 'Room');
  const roomsText = t('rooms', 'Rooms');
  const roomsFormatted = `${roomsAmount} ${usePlural(
    roomsAmount,
    roomText,
    roomsText,
  )}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px] ">
          {flightName}
        </section>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {roomsFormatted}
        </section>
      </section>
    </section>
  );
};

export default FlightItineraryHeader;
