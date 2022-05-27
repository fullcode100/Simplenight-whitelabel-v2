import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { HotelCart } from 'types/cart/CartType';

interface HotelItineraryHeaderProps {
  item: HotelCart;
  icon: ReactElement;
}

const HotelItineraryHeader = ({ item, icon }: HotelItineraryHeaderProps) => {
  const [t, i18next] = useTranslation('hotels');

  const hotelName = item.details?.name;
  const roomsAmount = item.items?.length;
  const roomsLabel = t('rooms', 'Rooms');
  const roomsFormatted = `${roomsAmount} ${roomsLabel}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px] ">
          {hotelName}
        </section>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {roomsFormatted}
        </section>
      </section>
    </section>
  );
};

export default HotelItineraryHeader;
