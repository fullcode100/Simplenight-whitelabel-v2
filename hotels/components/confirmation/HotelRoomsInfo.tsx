import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import RoomTitle from '../RoomTitle/RoomTitle';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import SupplierReference from '../SupplierReference/SupplierReference';

import { ClientBookingItemRemover } from 'core/client/ClientBookingItemRemover';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';
import { diffDays } from 'helpers/dajjsUtils';
import { Item } from 'types/booking/bookingType';

interface HotelRoomsInfoProps {
  item?: Item;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const HotelRoomsInfo = ({ item, loading, setLoading }: HotelRoomsInfoProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');

  const supplierReferenceID = item?.supplier_order_number;
  const roomDetail = item?.extra_data?.rooms?.[0];
  const roomName = roomDetail?.name;
  const amenities = roomDetail?.amenities.join(', ');

  const cancellationPolicy = item?.cancellation_policy?.description;
  const total = item?.total.formatted;
  const taxesAndFees = item?.total_tax.formatted;
  const resortFees = item?.total_postpaid.formatted;

  const startDate = item?.extra_data?.start_date;
  const endDate = item?.extra_data?.end_date;
  const nights = startDate && endDate ? diffDays(startDate, endDate) : 0;

  const handleItemRemoval = async () => {
    const itemRemover = new ClientBookingItemRemover();
    const requestData: DeleteBookingItemRequest = {
      bookingId: item?.booking_id || '',
      itemId: item?.booking_item_id || '',
    };

    setLoading?.(!loading);
    await itemRemover
      .request(requestData, i18next)
      .catch((error) => console.error(error));

    setLoading?.(!loading);
    router.reload();
  };

  return (
    <section className="flex flex-col gap-2 border-t border-dark-300 py-6">
      <RoomTitle roomName={roomName} roomQty={item?.room_qty} nights={nights} />

      {supplierReferenceID && (
        <SupplierReference supplierReferenceID={supplierReferenceID} />
      )}

      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFees}
        resortFees={resortFees}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
        adultsCount={item?.adults}
        childrenCount={item?.children}
      />
      <Button
        value={cancelLabel}
        size="full-sm"
        type="outlined"
        translationKey="cancelReservation"
        onClick={handleItemRemoval}
      ></Button>
    </section>
  );
};

export default HotelRoomsInfo;
