import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';
import { Item } from 'types/cart/CartType';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface HotelItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelItineraryFooter = ({
  item,
  reload,
  setReload,
}: HotelItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('hotels');

  const removeLabel = tg('remove', 'Remove');
  const roomsAmount = item.room_qty ?? 1;
  const roomText = th('room', 'Room');
  const roomsText = th('rooms', 'Rooms');
  const removeRoomsFormatted = `${removeLabel} ${roomsAmount} ${usePlural(
    roomsAmount,
    roomText,
    roomsText,
  )}`;

  const editLabel = tg('edit', 'Edit');

  const totalRate = item.rate?.min_rate.rate;

  const removeAllRooms = () => {
    const roomToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, roomToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllRooms = () => {
    removeAllRooms();
  };

  const handleEdit = () => {
    const adults = item.adults;
    const children = item.children;
    const startDate = item.extended_data?.start_date;
    const endDate = item.extended_data?.end_date;
    const coordinates = item.extended_data?.details?.address.coordinates;
    const geolocation = `${coordinates?.latitude},${coordinates?.longitude}`;
    const rooms = item.room_qty;

    removeAllRooms();
    router.push(
      `/detail/hotels/${item.extended_data?.id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${geolocation}&rooms=${rooms}`,
    );
  };

  return (
    <section className="flex flex-col gap-3">
      {totalRate && (
        <BreakdownSummary
          rate={totalRate}
          nights={item.nights}
          guests={item.guests}
        />
      )}
      <section className="flex flex-col gap-3 lg:flex-row lg:justify-end">
        <Button
          value={removeRoomsFormatted}
          size="full-sm"
          type="outlined"
          leftIcon={<TrashIcon />}
          onClick={handleRemoveAllRooms}
          className="lg:w-[170px]"
        ></Button>
        <Button
          value={editLabel}
          translationKey="edit"
          size=""
          leftIcon={<EdtiIcon />}
          onClick={handleEdit}
          className="lg:w-[170px] h-8"
        ></Button>
      </section>
    </section>
  );
};

export default HotelItineraryFooter;
