import { usePlural } from 'hooks/stringBehavior/usePlural';
import { useTranslation } from 'react-i18next';
import CheckoutSteps from './CheckoutSteps';
interface CheckoutStepsProps {
  step?: 'client' | 'payment' | null;
  itemsNumber?: number;
}

const CheckoutHeader = ({
  step = null,
  itemsNumber = 0,
}: CheckoutStepsProps) => {
  const [t, i18next] = useTranslation('global');
  const checkoutTitle = t('checkoutTitle', 'Checkout');
  const tItems = t('items', 'Items');
  const tItem = t('item', 'Item');
  const itemsText = usePlural(itemsNumber, tItem, tItems);

  return (
    <header className="p-5 bg-dark-100 lg:px-20 lg:pt-8">
      <section className="mx-auto max-w-7xl lg:flex lg:justify-between lg:items-center">
        <section>
          <h4 className="text-lg font-semibold text-dark-800 lg:text-3xl">
            {checkoutTitle}
          </h4>
          {step && <CheckoutSteps step={step} />}
        </section>
        {itemsNumber > 0 && (
          <p className="hidden text-2xl font-semibold lg:block text-dark-800">
            {itemsNumber} {itemsText}
          </p>
        )}
      </section>
    </header>
  );
};

export default CheckoutHeader;
