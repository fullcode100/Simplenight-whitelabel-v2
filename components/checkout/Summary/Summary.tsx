// Libraries
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Amount } from 'types/global/Amount';

type SummaryProps = {
  amount: Amount;
  href?: string;
};

const Summary = ({ amount, href = '#' }: SummaryProps) => {
  const [t] = useTranslation('hotels');
  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  return (
    <section className="flex w-full items-center justify-between">
      <h4 className="text-base leading-[22px] text-dark-1000">Total</h4>
      <section className="flex flex-col justify-end font-lato text-right">
        <p className="text-[18px] leading-6 font-bold text-dark-1000">
          {amount?.formatted}
        </p>
        <p className="text-[14px] leading-5 text-dark-800">
          Includes Taxes and Fees
        </p>
        <a
          className="text-base leading-[22px] font-semibold underline text-primary-1000 hover:text-primary-1000 hover:underline"
          href={href}
        >
          {priceBreakdownText}
        </a>
      </section>
    </section>
  );
};

export default Summary;
