import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import TaxesAndFeesPopover from 'hotels/components/TaxesAndFeesPopover/TaxesAndFeesPopover';
import { Rate } from 'types/cart/CartType';

interface PriceDisplayProps {
  rate: Rate;
  totalLabel?: string;
}

const PriceDisplay = ({ rate, totalLabel }: PriceDisplayProps) => {
  const percentageToApply = rate?.discounts.percentage_to_apply;
  const amountToApply = rate?.discounts.amount_to_apply;
  const showDiscountText = !!amountToApply?.amount;
  const totalBeforeDiscount =
    rate?.discounts.total_amount_before_apply.formatted;

  const [t] = useTranslation('global');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  return (
    <section className="text-right">
      {showDiscountText && totalBeforeDiscount && (
        <p className="text-xs">
          <span className="text-dark-700 line-through font-normal">
            {totalBeforeDiscount}
          </span>{' '}
          <span className="text-green-1000 font-semibold">
            {percentageToApply} Off
          </span>
        </p>
      )}
      <p
        className={classnames('leading-[22px] text-dark-1000', {
          ['flex flex-row gap-1 justify-end']: totalLabel,
        })}
      >
        <span className="text-[18px] font-semibold text-dark-1000">
          {totalLabel}
        </span>
      </p>

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
