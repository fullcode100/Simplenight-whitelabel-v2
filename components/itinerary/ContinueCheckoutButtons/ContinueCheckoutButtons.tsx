import { useTranslation } from 'react-i18next';

import Button from 'components/global/Button/Button';
interface ContinueCheckoutProps {
  productsAmount?: number;
}

const ContinueCheckoutButtons = ({ productsAmount }: ContinueCheckoutProps) => {
  const [t, i18next] = useTranslation('global');
  const continueShopping = t('continueShopping', 'Continue Shopping');
  const checkOut = t('checkOut', 'Check Out');

  const showCheckOut = !!productsAmount && productsAmount > 0;

  return (
    <section className="flex flex-row gap-3">
      <Button size="full-sm" type="outlined" value={continueShopping} />
      {showCheckOut && <Button size="full-sm" value={checkOut} />}
    </section>
  );
};

export default ContinueCheckoutButtons;
