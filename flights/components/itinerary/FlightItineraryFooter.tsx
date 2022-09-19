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

interface FlightItineraryFooterProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const FlightItineraryFooter = ({
  item,
  reload,
  setReload,
}: FlightItineraryFooterProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('flights');

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
    removeAllRooms();
    router.push(`/detail/flights/${item.extended_data?.id}`);
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

export default FlightItineraryFooter;
