import React from 'react';
import { Rates } from 'thingsToDo/types/response/ThingsSearchResponse';

interface Props {
  rate: Rates;
}

const PriceDisplay = ({ rate }: Props) => {
  const percentageToApply = rate.discounts.percentage_to_apply;
  const totalBeforeDiscount =
    rate.discounts.total_amount_before_apply.formatted;

  return (
    <section className="text-right">
      {totalBeforeDiscount && (
        <p className="text-xs">
          <span className="font-normal line-through text-dark-700">
            {totalBeforeDiscount}
          </span>{' '}
          <span className="font-semibold text-green-1000">
            {percentageToApply} Off
          </span>
        </p>
      )}
      <p className="text-base font-semibold text-dark-1000">
        {rate.total.full.formatted}
      </p>
    </section>
  );
};

export default PriceDisplay;
