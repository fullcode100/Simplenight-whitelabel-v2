import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import RoomTitle from '../RoomTitle/RoomTitle';
import Button from 'components/global/Button/Button';

import { Item, MinRateRate } from '../../types/response/CartHotels';
import TrashIcon from 'public/icons/assets/small-trash.svg';
import { removeFromCart } from 'core/client/services/CartClientService';
import { Rate } from '../../../types/booking/bookingType';
import { Paragraph } from '@simplenight/ui';
import Divider from 'components/global/Divider/Divider';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface HotelRoomInfoProps {
  room: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelRoomInfo = ({ room, reload, setReload }: HotelRoomInfoProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');
  const removeLabel = t('remove', 'Remove');
  const resortTaxes = room.rate.taxes.full.amount.formatted;
  const selectedRoom = room.item_data?.room;

  const roomName = selectedRoom?.name;
  const amenities = selectedRoom?.amenities.join(', ');

  const roomRate: MinRateRate | undefined = selectedRoom?.rates.min_rate.rate;

  const cancellationPolicy =
    selectedRoom?.rates.min_rate.cancellation_policy?.description;
  const total = roomRate?.total_amount.formatted;
  const roomRateDetail = roomRate?.rate_breakdown;

  const taxesAndFees = roomRateDetail?.total_taxes;
  const taxesAndFeesFormatted = taxesAndFees?.formatted;

  const resortFees = roomRateDetail?.post_paid_rate?.total_taxes;
  const resortFeesFormatted = resortFees?.formatted;
  const termsOfService = room.item_data?.terms_and_conditions;

  const checkInInstructions = room?.item_data?.details.check_in_instructions;

  const Instructions = () => {
    const instructions = `${checkInInstructions ?? ''}
    ${room.item_data.details?.special_instructions ?? ''}
    ${room.item_data.details.fees?.mandatory ?? ''}
    ${room.item_data.details.fees?.optional ?? ''}
    `;
    const policies = room.item_data.details.policies ?? '';

    const hasInstructions = instructions.length > 0;
    const hasPolicies = policies.length > 0;

    return <Paragraph>{hasPolicies && <>{policies[0].list[0]}</>}</Paragraph>;
  };

  const handleRemoveRoom = () => {
    const roomToRemove = {
      cartId: room.cart_id,
      itemId: room.cart_item_id,
    };
    removeFromCart(i18next, roomToRemove)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
    router.reload();
  };

  return (
    <section className="flex flex-col gap-2 pb-6 px-4">
      <Divider />
      <RoomTitle
        roomName={roomName}
        roomQty={room.booking_data.room_qty}
        nights={room.booking_data.nights ?? 0}
      />
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFeesFormatted}
        resortFees={resortFeesFormatted}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
        adultsCount={room.booking_data.adults}
        childrenCount={room.booking_data.children}
        instructions={<Instructions />}
        termsOfService={termsOfService}
        rate={roomRate}
        resortTaxes={resortTaxes}
        isPriceBase
      />
      <br />
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
