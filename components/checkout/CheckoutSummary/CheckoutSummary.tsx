// Libraries
import React, { useState, Dispatch, SetStateAction } from 'react';
import CheckoutPriceBreakdown from '../CheckoutPriceBreakdown/CheckoutPriceBreakdown';
import { useTranslation } from 'react-i18next';
import { CartObjectResponse } from 'types/cart/CartType';

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
    <section className="flex w-full items-center justify-between lg:w-full">
      <section>
        <p className="text-sm">Total</p>
      </section>
      <section className="flex flex-col justify-end font-lato text-right">
        <p className="text-[18px] leading-6 font-bold text-dark-1000">
          {cart?.total_amount.formatted}
        </p>
        <p className="text-[14px] leading-5 text-dark-800">
          {taxesAndFeesLabel}
        </p>
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
