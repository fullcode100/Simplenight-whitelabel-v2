import React from 'react';
import { Rate } from '../../../hotels/types/response/SearchResponse';

interface PriceDisplayProps {
  rate: Rate;
}

const PriceDisplay = ({ rate }: PriceDisplayProps) => {
  const { total_amount: totalAmount, rate_breakdown: rateBreakdown } = rate;
  const { discounts } = rateBreakdown;
  let totalBeforeDiscount;
  if (discounts)
    ({ total_amount_before_apply: totalBeforeDiscount } = discounts);

  return (
    <section>
      {totalBeforeDiscount && (
        <p className="text-primary-1000 text-xs">
          <span className="text-dark-800 line-through">
            {totalBeforeDiscount.formatted}
          </span>{' '}
          25% Off
        </p>
      )}
      <p className="text-sm text-dark-1000 font-semibold">
        {totalAmount.formatted}
      </p>
    </section>
  );
};

export default PriceDisplay;
