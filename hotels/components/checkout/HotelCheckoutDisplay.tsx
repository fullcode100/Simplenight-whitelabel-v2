import { useTranslation } from 'react-i18next';

import Paragraph from 'components/global/Typography/Paragraph';
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
  const roomText = t('room', 'Room');
  const roomsText = t('rooms', 'Rooms');

  const name = item?.item_data.details.name;
  const itemsQty = item?.booking_data.room_qty
    ? item?.booking_data.room_qty
    : 0;

  const roomsLabel = usePlural(itemsQty, roomText, roomsText);
  const roomsFormatted = `${itemsQty} ${roomsLabel}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{Category.icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <section className="font-semibold text-dark-800 text-lg leading-6 ">
          {name}
        </section>
        <Paragraph size="small" textColor="text-dark-800">
          {roomsFormatted}
        </Paragraph>
      </section>
    </section>
  );
};

export default HotelCheckoutDisplay;
