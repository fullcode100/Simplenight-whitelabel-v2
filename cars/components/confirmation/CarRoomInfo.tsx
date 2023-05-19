import { useTranslation } from 'react-i18next';

import RoomTitle from '../RoomTitle/RoomTitle';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import Button from 'components/global/Button/Button';

import { diffDays } from 'helpers/dajjsUtils';
import { Item } from 'types/booking/bookingType';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface CarRoomInfoProps {
  item: Item;
}

const CarRoomInfo = ({ item }: CarRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');
  // const supplierIdLabel = t('supplierReferenceID', 'Supplier Reference ID');
  // const supplierReferenceID = item.supplier_order_number;

  const cancellationPolicy = t('nonRefundable', 'Non refundable');
  const total = `${item?.booking_data?.car.VehAvailCore.TotalCharge['@RateTotalAmount']} ${item?.booking_data?.car.VehAvailCore.TotalCharge['@CurrencyCode']}`;
  const taxesAndFees = '';

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomPriceBreakdown total={total} />
      <Button
        value={cancelLabel}
        size="full-sm"
        type="outlined"
        translationKey="cancelReservation"
      ></Button>
    </section>
  );
};

export default CarRoomInfo;
