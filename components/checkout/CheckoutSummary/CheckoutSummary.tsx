// Libraries
import React, { useState, Dispatch, SetStateAction } from 'react';
import CheckoutPriceBreakdown from '../CheckoutPriceBreakdown/CheckoutPriceBreakdown';
import { useTranslation } from 'react-i18next';
import { CartObjectResponse } from 'types/cart/CartType';
import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';

type CheckoutSummaryProps = {
  cart?: CartObjectResponse;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  href?: string;
};

const CheckoutSummary = ({
  cart,
  reload,
  setReload,
  href = '#',
}: CheckoutSummaryProps) => {
  const [openPriceBreakdown, setOpenPriceBreakdown] = useState(false);

  const [t] = useTranslation('global');
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  return (
    <section className="flex items-center justify-between w-full lg:w-full">
      <section>
        <p className="text-sm">Total</p>
      </section>
      <section className="flex flex-col justify-end text-right font-lato">
        <p className="text-[18px] leading-6 font-semibold text-dark-1000">
          {cart?.total_amount.formatted}
        </p>
        <section className="flex flex-row gap-1">
          <p className="text-[14px] leading-5 text-dark-800">
            {taxesAndFeesLabel}
          </p>
          <TaxesAndFeesPopover />
        </section>

        <a
          className="lg:hidden text-base leading-[22px] font-semibold underline text-primary-1000 hover:text-primary-1000 hover:underline"
          href={href}
          onClick={() => setOpenPriceBreakdown(true)}
        >
          {priceBreakdownText}
        </a>
        <CheckoutPriceBreakdown
          reload={reload}
          setReload={setReload}
          cart={cart}
          openPriceBreakdown={openPriceBreakdown}
          onClose={() => setOpenPriceBreakdown(false)}
        />
      </section>
    </section>
  );
};

export default CheckoutSummary;
