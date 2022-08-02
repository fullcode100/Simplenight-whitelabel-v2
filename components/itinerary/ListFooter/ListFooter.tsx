import { useRouter } from 'next/router';

import ModalFooter from '../../global/NewModal/components/ModalFooter';
import { TotalAmount } from '../../../types/cart/CartType';
import { useTranslation } from 'react-i18next';

interface ListFooterProps {
  totalAmount: TotalAmount;
  className?: string;
}

const ListFooter = ({ totalAmount, className }: ListFooterProps) => {
  const router = useRouter();
  const [t, i18next] = useTranslation('global');
  const totalLabel = t('total', 'Total');
  const taxLabel = t('includesTaxesAndFees', 'Includes Taxes and Fees');
  const checkoutButton = t('checkoutTitle', 'Check Out');

  const SummaryCheckout = () => {
    return (
      <section className="flex items-center justify-between">
        <p className="text-sm text-dark-1000">{totalLabel}</p>
        <section className="text-right">
          <p className="text-base text-dark-1000 font-bold">
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
      primaryButtonAction={() => router.replace('/checkout/client')}
      summary={<SummaryCheckout />}
      className={className}
    />
  );
};

export default ListFooter;
