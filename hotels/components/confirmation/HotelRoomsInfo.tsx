import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
import RoomTitle from '../RoomTitle/RoomTitle';
import RoomPriceBreakdown from '../RoomPriceBreakdown/RoomPriceBreakdown';
import SupplierReference from '../SupplierReference/SupplierReference';
import CancelModal from 'components/confirmation/CancelModal/CancelModal';

import { ClientBookingItemRemover } from 'core/client/ClientBookingItemRemover';
import { DeleteBookingItemRequest } from 'types/confirmation/DeleteBookingRequest';
import useModal from 'hooks/layoutAndUITooling/useModal';
import { diffDays } from 'helpers/dajjsUtils';
import { Item, Payment, PrimaryContact } from 'types/booking/bookingType';

interface HotelRoomsInfoProps {
  item?: Item;
  payment?: Payment;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const HotelRoomsInfo = ({
  item,
  payment,
  loading,
  setLoading,
}: HotelRoomsInfoProps) => {
  const router = useRouter();
  const [isOpen, onOpen, onClose] = useModal();

  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');

  const supplierReferenceID = item?.supplier_order_number;
  const customer = item?.customer;
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

  const bookingItemsList = item ? [item] : [];

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
    <section className="flex flex-col gap-2 py-6 border-t lg:gap-3 border-dark-300 lg:pt-6 lg:pb-0">
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
      <section className="lg:flex lg:justify-end">
        <section className="lg:w-1/4">
          <Button
            value={cancelLabel}
            size="full-sm"
            type="outlined"
            translationKey="cancelReservation"
            onClick={onOpen}
          />
          <CancelModal
            open={isOpen}
            onClose={onClose}
            bookingItemsList={bookingItemsList}
            payment={payment}
            loading={loading}
            setLoading={setLoading}
            handleCancel={handleItemRemoval}
          />
        </section>
      </section>
    </section>
  );
};

export default HotelRoomsInfo;
