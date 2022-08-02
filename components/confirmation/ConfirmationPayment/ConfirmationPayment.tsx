import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';
import CardLogo from '../CardLogo/CardLogo';

interface ConfirmationPaymentProps {
  booking: Booking;
}

const ConfirmationPayment = ({ booking }: ConfirmationPaymentProps) => {
  const [t] = useTranslation('global');
  const paymentMethods = t('paymentMethods', 'Payment Methods');

  const payment = booking.payments[0];
  const {
    last_four: lastFour,
    transaction_amount: transactionAmount,
    card_brand: cardBrand,
  } = payment;

  return (
    <section className="flex flex-col gap-5 lg:gap-0 lg:shadow-container px-5 lg:px-0 py-6 lg:py-0 lg:border lg:rounded lg:border-dark-300">
      <h4 className="lg:border-b lg:border-dark-300 lg:bg-dark-100 text-lg lg:text-[24px] lg:leading-[29px] text-dark-800 font-semibold mb-6 lg:p-6">
        {paymentMethods}
      </h4>
      <section className="flex justify-between lg:p-6">
        <section className="p-2 bg-dark-100 rounded flex">
          <h4 className="text-sm leading-[22px] text-dark-1000 font-semibold mr-3">
            ···· ···· ···· {lastFour}
          </h4>
          <CardLogo cardBrand={cardBrand} />
        </section>
        <h4 className="text-sm leading-[22px] text-dark-1000 font-semibold self-center">
          {transactionAmount.formatted}
        </h4>
      </section>
    </section>
  );
};

export default ConfirmationPayment;
