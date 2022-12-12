import { useTranslation } from 'react-i18next';

import RoomTitle from '../RoomTitle/RoomTitle';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import Button from 'components/global/Button/Button';

import { diffDays } from 'helpers/dajjsUtils';
import { Item } from 'types/booking/bookingType';

const RESORT_FEES = 'RESORT_FEES';
const TAXES_AND_FEES = 'TAXESANDFEES';

interface FlightRoomInfoProps {
  item: Item;
}

const FlightRoomInfo = ({ item }: FlightRoomInfoProps) => {
  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');
  const supplierIdLabel = t('supplierReferenceID', 'Supplier Reference ID');
  const supplierReferenceID = item.supplier_order_number;

  const cancellationPolicy = t('nonRefundable', 'Non refundable');
  const total = `${item?.booking_data?.offer?.totalAmound} ${item?.booking_data?.search?.currency}`;
  const taxesAndFees = `${item?.booking_data?.offer?.baseFare} ${item?.booking_data?.search?.currency}`;

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <section>
        <p className="font-semibold text-sm text-dark-700">{supplierIdLabel}</p>
        <p className="font-semibold text-sm text-primary-1000">
          {supplierReferenceID}
        </p>
      </section>
      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFees}
        cancellationPolicy={cancellationPolicy}
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

export default FlightRoomInfo;
