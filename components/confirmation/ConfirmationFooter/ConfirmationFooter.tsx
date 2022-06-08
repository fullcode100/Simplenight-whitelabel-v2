import Divider from 'components/global/Divider/Divider';
import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';
import ConfirmationFooterButtons from '../ConfirmationFooterButtons/ConfirmationFooterButtons';
import ConfirmationPriceBreakdown from '../ConfirmationPriceBreakdown/ConfirmationPriceBreakdown';

interface ConfirmationFooterProps {
  booking: Booking;
}

const ConfirmationFooter = ({ booking }: ConfirmationFooterProps) => {
  const [t, i18next] = useTranslation('global');
  const orderTotalLabel = t('orderTotal', 'Order Total');

  const { order_total: orderTotal } = booking;

  return (
    <section className="flex flex-col px-5 py-6 bg-dark-100">
      <ConfirmationPriceBreakdown booking={booking} />
      <Divider className="mt-1.5" />
      <section className="flex py-6 justify-center">
        <section className="flex">
          <h1 className="font-semibold text-dark-600 text-[20px] mr-3">
            {orderTotalLabel}
          </h1>
          <h1 className="font-semibold text-dark-1000 text-[20px]">
            {orderTotal.formatted}
          </h1>
        </section>
      </section>
      <ConfirmationFooterButtons />
    </section>
  );
};

export default ConfirmationFooter;
