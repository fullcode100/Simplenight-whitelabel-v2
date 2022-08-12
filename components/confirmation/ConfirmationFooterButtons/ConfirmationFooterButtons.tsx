import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Button from 'components/global/Button/Button';
import CancelModal from '../CancelModal/CancelModal';

import { cancelBooking } from 'core/client/services/BookingService';
import useModal from 'hooks/layoutAndUITooling/useModal';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationFooterButtonsProps {
  booking: Booking;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  bookedAmount: number;
}

const ConfirmationFooterButtons = ({
  booking,
  loading,
  setLoading,
  bookedAmount,
}: ConfirmationFooterButtonsProps) => {
  const router = useRouter();
  const [isOpen, onOpen, onClose] = useModal();

  const [t, i18next] = useTranslation('global');
  const continueShopping = t('continueShopping', 'Continue Shopping');
  const cancelOrder = t('cancelOrder', 'Cancel Order');

  const bookingId = booking.booking_id;
  const payment = booking.payments[0];
  const primaryContact = booking.primary_contact;
  const bookingItemsList = booking.items;

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleCancelBooking = () => {
    setLoading(!loading);
    cancelBooking(i18next, bookingId).then(() => {
      setLoading(!loading);
      router.reload();
    });
  };

  return (
    <section className="flex flex-col">
      <button
        onClick={handleContinueShopping}
        className="mb-3 rounded h-11 bg-primary-1000"
      >
        <h4 className="font-semibold text-white  text-[18px]">
          {continueShopping}
        </h4>
      </button>
      {bookedAmount > 0 && (
        <section>
          <Button
            value={cancelOrder}
            size="full"
            type="outlined"
            translationKey="cancelOrder"
            onClick={onOpen}
          />
          <CancelModal
            open={isOpen}
            onClose={onClose}
            bookingItemsList={bookingItemsList}
            payment={payment}
            primaryContact={primaryContact}
            loading={loading}
            setLoading={setLoading}
            handleCancel={handleCancelBooking}
            isCancelOrder
          />
        </section>
      )}
    </section>
  );
};

export default ConfirmationFooterButtons;
