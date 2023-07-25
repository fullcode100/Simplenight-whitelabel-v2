import { useTranslation } from 'react-i18next';

import { Paragraph } from '@simplenight/ui';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import { usePlural } from 'hooks/stringBehavior/usePlural';

import { Item } from '../../types/response/CartHotels';
import { CategoryOption } from 'types/search/SearchTypeOptions';

interface HotelCheckoutDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const HotelCheckoutDisplay = ({
  item,
  Category,
}: HotelCheckoutDisplayProps) => {
  const [t, i18n] = useTranslation('hotels');
  const nightText = t('night', 'Nights');
  const nigthsText = t('nights', 'Nights');
  const roomText = t('room', 'Room');
  const roomsText = t('rooms', 'Rooms');

  const name = item?.item_data.details.name;
  const itemsQty = item?.booking_data.nights ? item?.booking_data.nights : 0;
  const roomsQty = item?.booking_data.room_qty
    ? item?.booking_data.room_qty
    : 0;

  const nightsLabel = usePlural(itemsQty, nightText, nigthsText);
  const nightsFormatted = `${itemsQty} ${nightsLabel}`;

  const roomsLabel = usePlural(roomsQty, roomText, roomsText);
  const roomsFormatted = `${roomsQty} ${roomsLabel}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{Category.icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px]">
          {name}
        </section>
        <Paragraph size="small" fontWeight="semibold" textColor="text-dark-800">
          {`${roomsFormatted}, ${nightsFormatted}`}
        </Paragraph>
      </section>
    </section>
  );
};

export default HotelCheckoutDisplay;
