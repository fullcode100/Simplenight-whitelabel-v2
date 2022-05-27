import { useTranslation } from 'react-i18next';
import CheckoutStepItem from './CheckoutStepItem';
import Buyer from 'public/icons/assets/buyer-user.svg';
import CreditCard from 'public/icons/assets/credit-card.svg';
import Checkmark from 'public/icons/assets/checkmark.svg';

interface CheckoutStepsProps {
  step: 'client' | 'payment';
}

const CheckoutSteps = ({ step }: CheckoutStepsProps) => {
  const [t, i18next] = useTranslation('global');
  const orderNameStep = t('orderName', 'Order Name');
  const paymentStep = t('payment', 'Payment');

  return (
    <section className="flex gap-3 justify-start items-center mt-4">
      <CheckoutStepItem
        text={orderNameStep}
        status={step === 'client' ? 'active' : 'completed'}
        icon={step === 'client' ? <Buyer /> : <Checkmark />}
      />
      <div className="w-6 border-t-2 border-dark-500" />
      <CheckoutStepItem
        text={paymentStep}
        status={step === 'client' ? 'inactive' : 'active'}
        icon={<CreditCard />}
      />
    </section>
  );
};

export default CheckoutSteps;
