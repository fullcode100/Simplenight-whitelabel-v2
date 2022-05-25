import ModalFooter from '../../global/NewModal/components/ModalFooter';
import { TotalAmount } from '../../../types/cart/CartType';
import { useTranslation } from 'react-i18next';

interface ListFooterProps {
  totalAmount: TotalAmount;
}

const ListFooter = ({ totalAmount }: ListFooterProps) => {
  const [t, i18next] = useTranslation('global');
  const totalLabel = t('total', 'Total');
  const taxLabel = t('tax', 'Includes Taxes and Fees');
  const checkoutButton = t('checkout', 'Check Out');

  const SummaryCheckout = () => {
    return (
      <section className="flex items-center justify-between">
        <p className="text-sm text-dark-1000">{totalLabel}</p>
        <section className="text-right">
          <p className="text-base text-dark-1000 font-semibold">
            {totalAmount.formatted}
          </p>
          <p className="text-xs text-dark-800">{taxLabel}</p>
        </section>
      </section>
    );
  };

  return (
    <ModalFooter
      primaryButtonText={checkoutButton}
      primaryButtonAction={() =>
        console.log('To update with checkout function')
      }
      summary={<SummaryCheckout />}
      className="fixed bottom-0 z-30"
    />
  );
};

export default ListFooter;
