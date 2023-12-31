import { useTranslation } from 'react-i18next';

import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import RoomTitle from '../RoomTitle/RoomTitle';

import { Item, MinRateRate } from '../../types/response/CartHotels';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface HotelRoomInfoProps {
  room: Item;
}

const HotelRoomInfo = ({ room }: HotelRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');

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
  const resortFeesFormatted = resortFees?.formatted ?? '$0.00';
  const termsOfService = room.item_data?.terms_and_conditions;

  return (
    <section className="flex flex-col gap-2 px-4 py-4 border-t border-dark-300">
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
        termsOfService={termsOfService}
        rate={roomRate}
        isPriceBase
      />
    </section>
  );
};

export default HotelRoomInfo;
