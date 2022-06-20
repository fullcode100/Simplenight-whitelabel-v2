import { useTranslation } from 'react-i18next';

import RoomTitle from '../RoomTitle/RoomTitle';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import Button from 'components/global/Button/Button';

import { diffDays } from 'helpers/dajjsUtils';
import { Item } from 'types/booking/bookingType';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface HotelRoomInfoProps {
  room: Item;
}

const HotelRoomInfo = ({ room }: HotelRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');
  const supplierIdLabel = t('supplierReferenceID', 'Supplier Reference ID');

  const supplierReferenceID = room.supplier_order_number;
  const roomDetail = room.extra_data?.rooms?.[0];
  const roomName = roomDetail?.description;
  const amenities = roomDetail?.amenities.join(', ');

  const roomMinRate = roomDetail?.rates.min_rate;
  const roomRate = roomMinRate?.rate;
  const cancellationPolicy = roomMinRate?.cancellation_policy?.description;
  const total = roomRate.total_amount.formatted;
  const roomRateDetail = roomRate?.rate_breakdown;

  const taxesAndFees = roomRateDetail?.taxes.find(
    (tax) => tax.description === TAXES_AND_FEES,
  );
  const taxesAndFeesFormatted = taxesAndFees?.tax_amount.formatted;

  const resortFees = roomRateDetail?.post_paid_rate?.taxes.find(
    (tax) => tax.description === RESORT_FEES,
  );
  const resortFeesFormatted = resortFees?.tax_amount.formatted;

  const startDate = room.extra_data?.start_date;
  const endDate = room.extra_data?.end_date;
  const nights = startDate && endDate ? diffDays(startDate, endDate) : 0;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomTitle roomName={roomName} nights={nights} />
      <section>
        <p className="font-semibold text-sm text-dark-700">{supplierIdLabel}</p>
        <p className="font-semibold text-sm text-primary-1000">
          {supplierReferenceID}
        </p>
      </section>
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFeesFormatted}
        resortFees={resortFeesFormatted}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
      />
      <Button
        value={cancelLabel}
        size="full-sm"
        type="outlined"
        translationKey="cancelReservation"
      ></Button>
    </section>
  );
};

export default HotelRoomInfo;
