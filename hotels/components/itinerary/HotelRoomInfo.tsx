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

  const roomName = room.item_data.min_rate_room.name;
  const amenities = room.item_data.min_rate_room.amenities.join(', ');

  const roomMinRate = room.item_data.min_rate_room;
  const roomRate: MinRateRate = roomMinRate.rates.min_rate.rate;

  const cancellationPolicy = room.item_data.rooms
    .map((room) => room.rates.min_rate.cancellation_policy.description)
    .join(', ');
  const total = roomRate?.total_amount.formatted;
  const roomRateDetail = roomRate?.rate_breakdown;

  const taxesAndFees = roomRateDetail?.total_taxes;
  const taxesAndFeesFormatted = taxesAndFees?.formatted;

  const resortFees = roomRateDetail?.post_paid_rate?.total_taxes;
  const resortFeesFormatted = resortFees?.formatted ?? '$0.00';
  const termsOfService = room.item_data?.terms_and_conditions;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-4 px-4">
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
