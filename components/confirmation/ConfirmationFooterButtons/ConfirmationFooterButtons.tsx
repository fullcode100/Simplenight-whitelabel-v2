import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import Button from 'components/global/Button/Button';
import { cancelBooking } from 'core/client/services/BookingService';

interface ConfirmationFooterButtonsProps {
  bookingId: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  bookedAmount: number;
}

const ConfirmationFooterButtons = ({
  bookingId,
  loading,
  setLoading,
  bookedAmount,
}: ConfirmationFooterButtonsProps) => {
  const router = useRouter();

  const [t, i18next] = useTranslation('global');
  const continueShopping = t('continueShopping', 'Continue Shopping');
  const cancelOrder = t('cancelOrder', 'Cancel Order');

  const handleCancelBooking = () => {
    setLoading(!loading);
    cancelBooking(i18next, bookingId).then(() => {
      setLoading(!loading);
      router.reload();
    });
  };

  return (
    <section className="flex flex-col">
      <button className="h-11 bg-primary-1000 rounded mb-3">
        <h4 className="font-semibold text-white  text-[18px]">
          {continueShopping}
        </h4>
      </button>
      {bookedAmount > 0 && (
        <Button
          value={cancelOrder}
          size="full"
          type="outlined"
          translationKey="cancelOrder"
          onClick={handleCancelBooking}
        />
      )}
    </section>
  );
};

export default ConfirmationFooterButtons;
