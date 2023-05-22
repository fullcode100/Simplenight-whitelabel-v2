import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Button from 'components/global/Button/Button';
import CancelModal from '../CancelModal/CancelModal';

import useModal from 'hooks/layoutAndUITooling/useModal';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationFooterButtonsProps {
  booking: Booking;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  bookedAmount: number;
  handleCancelBooking: () => void;
}

const ConfirmationFooterButtons = ({
  booking,
  loading,
  setLoading,
  bookedAmount,
  handleCancelBooking,
}: ConfirmationFooterButtonsProps) => {
  const router = useRouter();
  const [isOpen, onOpen, onClose] = useModal();

  const [t, i18next] = useTranslation('global');
  const continueShopping = t('continueShopping', 'Continue Shopping');
  const cancelOrder = t('cancelOrder', 'Cancel Order');

  const bookingId = booking.booking_id;
  const payment = booking.payments[0];
  const bookingItemsList = booking.items;
  const bookingTotalOrder = booking.order_total.formatted;
  const hasSomeNotCancellableItem = bookingItemsList.some(
    (item) => !item.is_cancellable,
  );
  const isCancellable = !hasSomeNotCancellableItem && bookedAmount > 0;

  const handleContinueShopping = () => {
    router.push('/');
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
      {isCancellable && (
        <section>
          <Button
            value={cancelOrder}
            size="full"
            type="outlined"
            translationKey="cancelOrder"
            onClick={onOpen}
            disabled={loading}
          />
          <CancelModal
            open={isOpen}
            onClose={onClose}
            bookingItemsList={bookingItemsList}
            payment={payment}
            loading={loading}
            setLoading={setLoading}
            handleCancel={handleCancelBooking}
            bookingTotalOrder={bookingTotalOrder}
            isCancelOrder
          />
        </section>
      )}
    </section>
  );
};

export default ConfirmationFooterButtons;
