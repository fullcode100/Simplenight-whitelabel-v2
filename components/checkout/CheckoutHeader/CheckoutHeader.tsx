import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useTranslation } from 'react-i18next';
import CheckoutSteps from './CheckoutSteps';
interface CheckoutStepsProps {
  step: 'client' | 'payment';
  itemsNumber?: number;
}

const CheckoutHeader = ({ step, itemsNumber = 0 }: CheckoutStepsProps) => {
  const [t, i18next] = useTranslation('global');
  const checkoutTitle = t('checkoutTitle', 'Checkout');
  const tItems = t('items', 'Items');
  const tItem = t('item', 'Item');
  const itemsText = usePlural(itemsNumber, tItem, tItems);

  return (
    <header className="bg-dark-100 p-5 lg:px-20 lg:pt-8 lg:flex lg:justify-between lg:items-center">
      <section>
        <h4 className="font-semibold text-dark-800 text-lg lg:text-3xl">
          {checkoutTitle}
        </h4>
        <CheckoutSteps step={step} />
      </section>
      <p className="hidden lg:block text-dark-800 text-2xl font-semibold">
        {itemsNumber} {itemsText}
      </p>
    </header>
  );
};

export default CheckoutHeader;
