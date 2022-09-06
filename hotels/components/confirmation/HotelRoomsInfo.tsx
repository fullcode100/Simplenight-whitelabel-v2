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
  const vendorConfirmationNumber =
    item?.vendor_confirmation_code && item?.vendor_confirmation_code.length > 0
      ? item?.vendor_confirmation_code
      : '-';
  const vendorConfirmationLabel = t(
    'vendorConfirmation',
    'Vendor Confirmation Number',
  );
  const customer = item?.customer;
  const roomDetail = item?.extra_data?.rooms?.[0];
  const roomName = roomDetail?.name;
  const amenities = roomDetail?.amenities.join(', ');

  const cancellationPolicy = item?.cancellation_policy?.description;
  const total = item?.total.formatted;
  const taxesAndFees = item?.total_tax.formatted;
  const resortFees = item?.total_tax_postpaid.formatted;

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

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {supplierReferenceID && (
          <SupplierReference supplierReferenceID={supplierReferenceID} />
        )}
        {vendorConfirmationNumber && (
          <section className="grid gap-0 ">
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-700">
              {vendorConfirmationLabel}
            </p>
            <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-primary-1000">
              {vendorConfirmationNumber}
            </p>
          </section>
        )}
      </section>

      <RoomPriceBreakdown
        total={total}
        taxesAndFees={taxesAndFees}
        resortFees={resortFees}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
        adultsCount={item?.adults}
        childrenCount={item?.children}
        childrenAges={item?.children_ages}
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
