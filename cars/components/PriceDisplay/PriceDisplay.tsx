import React from 'react';
import classnames from 'classnames';

import { Car } from '../../types/response/CarSearchResponse';
import { useTranslation } from 'react-i18next';
import TaxesAndFeesPopover from 'cars/components/TaxesAndFeesPopover/TaxesAndFeesPopover';

interface PriceDisplayProps {
  item: Car;
  totalLabel?: string;
  isSearch?: boolean;
}

const PriceDisplay = ({
  item,
  totalLabel,
  isSearch = false,
}: PriceDisplayProps) => {
  const totalAmount = item.rate_total_amount['@RateTotalAmount'];
  const avgAmount = item.rate_total_amount['@EstimatedTotalAmount'];
  const currency = item.rate_total_amount['@CurrencyCode'];
  const discounts = null;
  const [t] = useTranslation('global');
  const startingRoomTotalLabel = t('total', 'Total');
  const taxesAndFeesLabel = t(
    'includesTaxesAndFees',
    'Includes Taxes and Fees',
  );

  let totalBeforeDiscount;
  let percentageToApply;
  if (discounts) {
    ({
      total_amount_before_apply: totalBeforeDiscount,
      percentage_to_apply: percentageToApply,
    } = discounts);
  }

  return (
    <section className="text-right">
      {totalBeforeDiscount && (
        <p className="text-xs">
          <span className="text-dark-700 line-through font-normal">
            {totalBeforeDiscount.formatted}
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
        <span className="text-xs">{totalLabel}</span>
        <span className="text-sm font-semibold">
          {isSearch ? avgAmount : totalAmount} {currency}
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
