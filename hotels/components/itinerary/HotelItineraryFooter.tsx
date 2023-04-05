import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';
import { Item } from '../../types/response/CartHotels';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import EdtiIcon from 'public/icons/assets/edit.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useCategoryType } from 'hooks/category/useCategory';
import { Rates } from '../../types/response/SearchResponse';

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
  const [tg, i18g] = useTranslation('global');
  const [th, i18h] = useTranslation('hotels');

  const removeLabel = tg('remove', 'Remove');
  const roomsAmount = item.booking_data.room_qty ?? 1;
  const roomText = th('room', 'Room');
  const roomsText = th('rooms', 'Rooms');
  const removeRoomsFormatted = `${removeLabel} ${roomsAmount} ${usePlural(
    roomsAmount,
    roomText,
    roomsText,
  )}`;

  const editLabel = tg('edit', 'Edit');

  const selectedRoom = item.item_data?.room;
  const totalRate = selectedRoom?.rates?.min_rate?.rate;
  const slug = useCategoryType('hotels')?.slug;

  const removeAllRooms = () => {
    const roomToRemove = {
      cartId: item.cart_id,
      itemId: item.cart_item_id,
    };
    removeFromCart(i18g, roomToRemove)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  const handleRemoveAllRooms = () => {
    removeAllRooms();
  };

  const handleEdit = () => {
    const adults = item.booking_data.adults;
    const children = item.booking_data.children;
    const startDate = item.item_data.start_date;
    const endDate = item.item_data.end_date;
    const coordinates = item.item_data.details.address.coordinates;
    const geolocation = `${coordinates?.latitude},${coordinates?.longitude}`;
    const rooms = roomsAmount;

    removeAllRooms();
    router.push(
      `/detail/${slug}/${item.item_data.id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${geolocation}&rooms=${rooms}`,
    );
  };

  return (
    <section className="flex flex-col gap-3">
      {totalRate && (
        <BreakdownSummary
          rate={selectedRoom.rates as unknown as Rates}
          nights={item.booking_data.nights}
          guests={item.booking_data.guests}
          showTotal={true}
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
