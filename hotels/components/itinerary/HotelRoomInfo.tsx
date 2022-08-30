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
  const resortFeesFormatted = resortFees?.tax_amount.formatted ?? '$0.00';
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
      />
    </section>
  );
};

export default HotelRoomInfo;
