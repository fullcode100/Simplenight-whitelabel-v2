import { useTranslation } from 'react-i18next';
import CheckoutSteps from './CheckoutSteps';

interface CheckoutStepsProps {
  step: 'client' | 'payment';
}

const CheckoutHeader = ({ step }: CheckoutStepsProps) => {
  const [t, i18next] = useTranslation('global');
  const checkoutTitle = t('checkoutTitle', 'Checkout');

  return (
    <header className="bg-dark-100 p-5">
      <h4 className="font-semibold text-dark-800 text-lg">{checkoutTitle}</h4>
      <CheckoutSteps step={step} />
    </header>
  );
};

export default CheckoutHeader;
