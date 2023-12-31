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
import { Item, Payment } from 'types/booking/bookingType';

interface HotelRoomsInfoProps {
  item?: Item;
  payment?: Payment;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  modalMode?: boolean;
}

const HotelRoomsInfo = ({
  item,
  payment,
  loading,
  setLoading,
  modalMode = false,
}: HotelRoomsInfoProps) => {
  const router = useRouter();
  const [isOpen, onOpen, onClose] = useModal();

  const [t, i18next] = useTranslation('global');
  const cancelLabel = t('cancelReservation', 'Cancel Reservation');

  const supplierReferenceID = item?.supplier_reference_id;
  const vendorConfirmationNumber =
    item?.vendor_confirmation_code && item?.vendor_confirmation_code.length > 0
      ? item?.vendor_confirmation_code
      : '-';
  const vendorConfirmationLabel = t(
    'vendorConfirmation',
    'Vendor Confirmation Number',
  );

  const selectedRoom = item?.item_data?.room;
  const roomName = selectedRoom?.name;
  const amenities = selectedRoom?.amenities.join(', ');
  const roomMinRate = selectedRoom?.rates.min_rate;
  const roomRate = roomMinRate?.rate;
  const cancellationPolicy = roomMinRate?.cancellation_policy?.description;
  const total = roomRate?.total_amount.formatted;
  const roomRateDetail = roomRate?.rate_breakdown;
  const taxesAndFees = roomRateDetail?.total_taxes.formatted;
  const resortFees = roomRateDetail?.post_paid_rate?.total_taxes.formatted;
  const termsOfService = item?.extra_data?.terms_and_conditions;
  const refundAmount = item?.refund_amount_estimate.formatted;

  const nights = item?.booking_data?.nights ? item?.booking_data?.nights : 0;

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

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
        adultsCount={item?.booking_data?.adults}
        childrenCount={item?.booking_data?.children}
        childrenAges={item?.booking_data?.children_ages}
        rate={roomRate}
        termsOfService={termsOfService}
        isPriceBase
      />
      {item?.cancellation_policy?.cancellation_type !== 'NON_REFUNDABLE' &&
        !modalMode && (
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
                bookingTotalOrder={refundAmount || '$0.00'}
              />
            </section>
          </section>
        )}
    </section>
  );
};

export default HotelRoomsInfo;
