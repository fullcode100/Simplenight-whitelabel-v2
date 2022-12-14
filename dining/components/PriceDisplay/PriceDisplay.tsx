import React from 'react';
import classnames from 'classnames';

import { Price } from 'dining/types/response/SearchResponse';
import { useTranslation } from 'react-i18next';
import TaxesAndFeesPopover from '../TaxesAndFessPopover/TaxesAndFessPopover';
import { useRouter } from 'next/router';

interface PriceDisplayProps {
  price: Price;
}
const PriceDisplay = ({ price }: Price) => {
  const router = useRouter();
  const pathName = router.pathname;
  const totalAmount = price;
  const [t] = useTranslation('global');
  const startinDiningTotalLabel = t('total', 'Total');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );
  let percentageToApply;
  return (
    <section className="text-right">
      <span className="text-sm font-semibold">{totalAmount}</span>
      <section className="flex flex-row gap-1 justify-end">
        <p className="text-[12px] leading-[15px] text-dark-800">
          {taxesAndFeesLabel}
        </p>
        <TaxesAndFeesPopover />
      </section>
    </section>
  );
};

export default PriceDisplay;
