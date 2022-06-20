import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import RoomTitle from '../RoomTitle/RoomTitle';
import Button from 'components/global/Button/Button';

import { Item } from 'types/cart/CartType';
import { diffDays } from 'helpers/dajjsUtils';

import TrashIcon from 'public/icons/assets/small-trash.svg';
import { removeFromCart } from 'core/client/services/CartClientService';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface HotelRoomInfoProps {
  room: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelRoomInfo = ({ room, reload, setReload }: HotelRoomInfoProps) => {
  const dispatch = useDispatch();

  const [t, i18next] = useTranslation('global');
  const removeLabel = t('remove', 'Remove');

  const roomDetail = room.extended_data?.rooms?.[0];
  const roomName = roomDetail?.description;
  const amenities = roomDetail?.amenities.join(', ');

  const roomMinRate = roomDetail?.rates.min_rate;
  const roomRate = roomMinRate?.rate;
  const cancellationPolicy = roomMinRate?.cancellation_policy?.description;
  const total = roomRate?.total_amount.formatted;
  const roomRateDetail = roomRate?.rate_breakdown;

  const taxesAndFees = roomRateDetail?.taxes.find(
    (tax) => tax.description === TAXES_AND_FEES,
  );
  const taxesAndFeesFormatted = taxesAndFees?.tax_amount.formatted;

  const resortFees = roomRateDetail?.post_paid_rate?.taxes.find(
    (tax) => tax.description === RESORT_FEES,
  );
  const resortFeesFormatted = resortFees?.tax_amount.formatted;

  const startDate = room.extended_data?.start_date;
  const endDate = room.extended_data?.end_date;
  const nights = startDate && endDate ? diffDays(startDate, endDate) : 0;

  const handleRemoveRoom = () => {
    const roomToRemove = {
      cartId: room.cart_id,
      itemId: room.cart_item_id,
    };
    removeFromCart(i18next, roomToRemove, dispatch).then(() =>
      setReload?.(!reload),
    );
  };

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomTitle roomName={roomName} nights={nights} />
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFeesFormatted}
        resortFees={resortFeesFormatted}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
      />
      <Button
        value={removeLabel}
        size="full-sm"
        type="outlined"
        translationKey="remove"
        leftIcon={<TrashIcon />}
        onClick={handleRemoveRoom}
      ></Button>
    </section>
  );
};

export default HotelRoomInfo;
