import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';

interface ThingsRates {
  total: {
    amount: number;
    formatted: string;
    currency: string;
  };
  discount_percentage: string;
  total_amount_before_discount: {
    amount: number;
    formatted: string;
    currency: string;
  };
}
interface PriceDisplayProps {
  rate: ThingsRates;
  totalLabel?: string;
}

const PriceDisplay = ({ rate, totalLabel }: PriceDisplayProps) => {
  // const percentageToApply = rate?.discount_percentage;
  // const totalBeforeDiscount = rate?.total_amount_before_discount.formatted;

  const [t] = useTranslation('global');
  // const startingRoomTotalLabel = t('total', 'Total');
  // const taxesAndFeesLabel = t(
  //   'includesTaxesAndFees',
  //   'Includes Taxes and Fees',
  // );

  return (
    <section className="text-right">
      {/* {totalBeforeDiscount && (
        <p className="text-xs">
          <span className="text-dark-700 line-through font-normal">
            {totalBeforeDiscount}
          </span>{' '}
          <span className="text-green-1000 font-semibold">
            {percentageToApply} Off
          </span>
        </p>
      )} */}
      <p
        className={classnames('leading-[22px] text-dark-1000', {
          ['flex flex-row gap-1 justify-end']: totalLabel,
        })}
      >
        <span className="text-[18px] font-semibold text-dark-1000">
          {totalLabel}
        </span>
      </p>

      {/* <section className="flex flex-row gap-1 justify-end">
        <p className="text-[12px] leading-[15px] text-dark-800">
          {taxesAndFeesLabel}
        </p>
        <TaxesAndFeesPopover />
      </section> */}
    </section>
  );
};
export default PriceDisplay;
