import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { Booking } from 'types/booking/bookingType';
import Divider from 'components/global/Divider/Divider';
import ConfirmationFooterButtons from '../ConfirmationFooterButtons/ConfirmationFooterButtons';
import ConfirmationPriceBreakdown from '../ConfirmationPriceBreakdown/ConfirmationPriceBreakdown';

interface ConfirmationFooterProps {
  booking: Booking;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  bookedAmount: number;
  handleCancelBooking: () => void;
}

const ConfirmationFooter = ({
  booking,
  loading,
  setLoading,
  bookedAmount,
  handleCancelBooking,
}: ConfirmationFooterProps) => {
  const [t, i18next] = useTranslation('global');
  const orderTotalLabel = t('orderTotal', 'Order Total');

  const { order_total: orderTotal } = booking;

  return (
    <section className="flex flex-col px-5 py-6 border-b bg-dark-100 lg:bg-white lg:shadow-container lg:border lg:rounded border-dark-300">
      <ConfirmationPriceBreakdown booking={booking} />
      <Divider className="mt-1.5" />
      <section className="flex justify-center py-6">
        <section className="flex">
          <h1 className="font-semibold text-dark-600 text-[20px] mr-3">
            {orderTotalLabel}
          </h1>
          <h1 className="font-semibold text-dark-1000 text-[20px]">
            {orderTotal.formatted}
          </h1>
        </section>
      </section>

      <ConfirmationFooterButtons
        booking={booking}
        loading={loading}
        setLoading={setLoading}
        bookedAmount={bookedAmount}
        handleCancelBooking={handleCancelBooking}
      />
    </section>
  );
};

export default ConfirmationFooter;
