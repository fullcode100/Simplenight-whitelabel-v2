import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import BreakdownSummary from 'components/global/PriceBreakdownModal/components/BreakdownSummary';
import { getPriceDisplayParams } from 'hotels/helpers/itineraryUtils';
import { Item } from 'types/cart/CartType';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';

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
  const roomsLabel = th('rooms', 'Rooms');
  const roomsAmount = item.extended_data?.items?.length;
  const removeRoomsFormatted = `${removeLabel} ${roomsAmount} ${roomsLabel}`;

  const editLabel = tg('edit', 'Edit');

  const totalRate = getPriceDisplayParams(item.extended_data);

  const removeAllRooms = () =>
    item.extended_data?.items?.forEach((room) => {
      const roomToRemove = {
        cartId: room.cart_id,
        itemId: room.cart_item_id,
      };
      removeFromCart(i18g, roomToRemove, dispatch).then(() =>
        setReload?.(!reload),
      );
    });

  const handleRemoveAllRooms = () => {
    removeAllRooms();
  };

  const handleEdit = () => {
    removeAllRooms();
    router.push(`/detail/hotels/${item.extended_data?.id}`);
  };

  return (
    <section className="flex flex-col gap-3">
      {totalRate && <BreakdownSummary rate={totalRate} />}
      <Button
        value={removeRoomsFormatted}
        size="full-sm"
        type="outlined"
        leftIcon={<TrashIcon />}
        onClick={handleRemoveAllRooms}
      ></Button>
      <Button
        value={editLabel}
        translationKey="edit"
        size="full-sm"
        leftIcon={<EdtiIcon />}
        onClick={handleEdit}
      ></Button>
    </section>
  );
};

export default HotelItineraryFooter;
