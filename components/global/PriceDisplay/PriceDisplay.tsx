import React from 'react';
import classnames from 'classnames';

import { Rate } from '../../../hotels/types/response/SearchResponse';

interface PriceDisplayProps {
  rate: Rate;
  totalLabel?: string;
}

const PriceDisplay = ({ rate, totalLabel }: PriceDisplayProps) => {
  const totalAmount = rate?.total_amount;
  const rateBreakdown = rate?.rate_breakdown;
  const discounts = rateBreakdown?.discounts;
  let totalBeforeDiscount;
  let percentageToApply;
  if (discounts) {
    ({
      total_amount_before_apply: totalBeforeDiscount,
      percentage_to_apply: percentageToApply,
    } = discounts);
  }

  return (
    <section>
      {totalBeforeDiscount && (
        <p className="text-sm">
          <span className="text-dark-800 line-through font-normal">
            {totalBeforeDiscount.formatted}
          </span>{' '}
          <span className="text-primary-1000 font-semibold">
            {percentageToApply} Off
          </span>
        </p>
      )}
      <p
        className={classnames('text-[18px] leading-6 ', {
          ['flex flex-row gap-1 justify-end']: totalLabel,
        })}
      >
        <span className="text-dark-800 font-normal">{totalLabel}</span>
        <span className="text-base text-dark-1000 font-bold">
          {totalAmount?.formatted}
        </span>
      </p>
    </section>
  );
};
export default PriceDisplay;
