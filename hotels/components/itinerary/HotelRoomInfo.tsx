import { useTranslation } from 'react-i18next';

import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import RoomTitle from '../RoomTitle/RoomTitle';

import { Item } from 'types/cart/CartType';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface HotelRoomInfoProps {
  room: Item;
}

const HotelRoomInfo = ({ room }: HotelRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');

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
  const resortFeesFormatted = resortFees?.formatted ?? '$0.00';
  const termsOfService = room.extended_data?.terms_and_conditions;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
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
        termsOfService={termsOfService}
        rate={roomRate}
        startingRoomTotal={
          roomRate?.starting_room_total &&
          roomRate?.starting_room_total.formatted
        }
      />
    </section>
  );
};

export default HotelRoomInfo;
