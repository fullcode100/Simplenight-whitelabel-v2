import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'hooks/localStorage/useLocalStorage';
// Components
import Button from 'components/global/Button/Button';
interface ContinueCheckoutProps {
  productsAmount?: number;
}

const ContinueCheckoutButtons = ({ productsAmount }: ContinueCheckoutProps) => {
  const router = useRouter();
  const [t, i18next] = useTranslation('global');
  const continueShopping = t('continueShopping', 'Continue Shopping');
  const [storedValue] = useLocalStorage('lastSearch', '');
  const checkOut = t('checkoutTitle', 'Check Out');

  const showCheckOut = !!productsAmount && productsAmount > 0;

  const handleContinue = () => {
    router.push(storedValue);
  };

  return (
    <section className="flex flex-row gap-3">
      <Button
        size="full-sm"
        type="outlined"
        translationKey="continueShopping"
        value={continueShopping}
        onClick={handleContinue}
      />
      {showCheckOut && (
        <Button
          size="full-sm"
          translatioKey="checkoutTitle"
          value={checkOut}
          onClick={() => {
            router.replace('/checkout/client');
          }}
        />
      )}
    </section>
  );
};

export default ContinueCheckoutButtons;
