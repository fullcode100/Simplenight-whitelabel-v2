import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationFooterProps {
  booking: Booking;
}

const ConfirmationPriceBreakdown = ({ booking }: ConfirmationFooterProps) => {
  const [t, i18next] = useTranslation('global');
  const itemsSubtotal = t('itemsSubtotal', 'Items Subtotal');
  const taxes = t('taxes', 'Taxes');
  const otherFees = t('otherFees', 'Other Fees');

  const {
    order_total: orderTotal,
    tax_total: taxTotal,
    tax_total_postpaid: taxTotalPostpaid,
  } = booking;

  return (
    <section className="flex flex-col">
      <section className="flex justify-between mb-3">
        <h4 className="font-semibold text-dark-600 text-[18px]">
          {itemsSubtotal}
        </h4>
        <h4 className="font-semibold text-dark-1000 text-[18px]">
          {orderTotal.formatted}
        </h4>
      </section>
      <section className="flex justify-between mb-3">
        <h4 className="font-semibold text-dark-600 text-[18px]">{taxes}</h4>
        <h4 className="font-semibold text-dark-1000 text-[18px]">
          {taxTotal.formatted}
        </h4>
      </section>
      <section className="flex justify-between mb-3">
        <h4 className="font-semibold text-dark-600 text-[18px]">{otherFees}</h4>
        <h4 className="font-semibold text-dark-1000 text-[18px]">
          {taxTotalPostpaid.formatted}
        </h4>
      </section>
    </section>
  );
};

export default ConfirmationPriceBreakdown;
