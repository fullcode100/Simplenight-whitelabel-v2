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
import { CheckInInstructions } from 'hotels/types/response/SearchResponse';

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

  const selectedRoom = room.extended_data?.rooms?.find(
    (roomA) => roomA.code == room.extended_data?.selected_room_code,
  );
  const roomName = selectedRoom?.name;
  const amenities = selectedRoom?.amenities.join(', ');

  const roomMinRate = selectedRoom?.rates.min_rate;
  const roomRate = roomMinRate?.rate;
  const cancellationPolicy = roomMinRate?.cancellation_policy?.description;
  const total = roomRate?.total_amount.formatted;
  const roomRateDetail = roomRate?.rate_breakdown;

  const taxesAndFees = roomRateDetail?.total_taxes;
  const taxesAndFeesFormatted = taxesAndFees?.formatted;

  const resortFees = roomRateDetail?.post_paid_rate?.total_taxes;
  const resortFeesFormatted = resortFees?.formatted;
  const termsOfService = room.extended_data?.terms_and_conditions;

  const checkInInstructions = room.extended_data?.check_in_instructions;

  const Instructions = () => {
    const instructions = `${checkInInstructions?.instructions ?? ''}
    ${checkInInstructions?.special_instructions ?? ''}
    ${checkInInstructions?.fees?.mandatory ?? ''}
    ${checkInInstructions?.fees?.optional ?? ''}
    `;
    const policies = checkInInstructions?.policies ?? '';

    const hasInstructions = instructions && instructions !== '';
    const hasPolicies = policies && policies !== '';

    return (
      <section className="mb-6 font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
        {hasInstructions && <>{instructions}</>}
        {hasPolicies && (
          <>
            <br />
            {policies}
          </>
        )}
      </section>
    );
  };

  const handleRemoveRoom = () => {
    const roomToRemove = {
      cartId: room.cart_id,
      itemId: room.cart_item_id,
    };
    removeFromCart(i18next, roomToRemove, dispatch)
      .then(() => setReload?.(!reload))
      .catch((error) => console.error(error));
  };

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomTitle
        roomName={roomName}
        roomQty={room.room_qty}
        nights={room.nights ?? 0}
      />
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFeesFormatted}
        resortFees={resortFeesFormatted}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
        adultsCount={room.adults}
        childrenCount={room.children}
        instructions={<Instructions />}
        termsOfService={termsOfService}
        rate={roomRate}
        isPriceBase
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
