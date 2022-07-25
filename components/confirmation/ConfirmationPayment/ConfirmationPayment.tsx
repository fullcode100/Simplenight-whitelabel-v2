import { useTranslation } from 'react-i18next';
import { Booking } from 'types/booking/bookingType';
import Image from 'next/image';

interface ConfirmationPaymentProps {
  booking: Booking;
}

const ConfirmationPayment = ({ booking }: ConfirmationPaymentProps) => {
  const [t, i18next] = useTranslation('global');
  const paymentMethods = t('paymentMethods', 'Payment Methods');

  const payment = booking.payments[0];
  const { last_four: lastFour, transaction_amount: transactionAmount } =
    payment;

  return (
    <section className="flex flex-col px-5 py-6">
      <h4 className="text-lg text-dark-800 font-semibold mb-6">
        {paymentMethods}
      </h4>
      <section className="flex justify-between">
        <section className="p-2 bg-dark-100 rounded flex">
          <h4 className="text-sm leading-[22px] text-dark-1000 font-semibold mr-3">
            ···· ···· ···· {lastFour}
          </h4>
          <Image
            src={'/images/visa-image.png'}
            alt={''}
            width={40}
            height={22}
          />
        </section>
        <h4 className="text-sm leading-[22px] text-dark-1000 font-semibold self-center">
          {transactionAmount.formatted}
        </h4>
      </section>
    </section>
  );
};

export default ConfirmationPayment;
