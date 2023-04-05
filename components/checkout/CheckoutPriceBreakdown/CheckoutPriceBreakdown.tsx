import { MouseEvent, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import FullScreenModal from 'components/global/NewModal/FullScreenModal';
import { CartObjectResponse } from 'types/cart/CartType';
import BreakdownItemList from '../BreakdownItemList/BreakdownItemList';
import BreakdownTotal from '../BreakdownTotal/BreakdownTotal';

interface CheckoutPriceBreakdownProps {
  cart?: CartObjectResponse;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  openPriceBreakdown: boolean;
  onClose: (event?: MouseEvent<HTMLElement>) => void;
}

const CheckoutPriceBreakdown = ({
  cart,
  reload,
  setReload,
  openPriceBreakdown,
  onClose,
}: CheckoutPriceBreakdownProps) => {
  const [t, i18next] = useTranslation('global');
  const modalLabel = t('priceBreakdown', 'Price Breakdown');

  return (
    <FullScreenModal
      open={openPriceBreakdown}
      closeModal={onClose}
      title={modalLabel}
      footerSummary={<BreakdownTotal total={cart?.rate.total.full.formatted} />}
    >
      <section className="h-full overflow-y-scroll text-left">
        <BreakdownItemList cart={cart} reload={reload} setReload={setReload} />
      </section>
    </FullScreenModal>
  );
};

export default CheckoutPriceBreakdown;
