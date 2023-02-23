import React from 'react';
import { Rates } from 'thingsToDo/types/response/ThingsSearchResponse';
import { Paragraph } from '@simplenight/ui';

interface Props {
  rate: Rates;
}

const PriceDisplay = ({ rate }: Props) => {
  const percentageToApply = rate.discounts.percentage_to_apply;
  const totalBeforeDiscount =
    rate.discounts.total_amount_before_apply.formatted;

  return (
    <section className="text-right">
      {totalBeforeDiscount && percentageToApply !== '0%' && (
        <Paragraph size="xsmall">
          <span className="font-normal line-through text-dark-700">
            {totalBeforeDiscount}
          </span>{' '}
          <span className="font-semibold text-green-1000">
            {percentageToApply} Off
          </span>
        </Paragraph>
      )}
      <Paragraph size="medium" fontWeight="semibold">
        {rate.total.full.formatted}
      </Paragraph>
    </section>
  );
};

export default PriceDisplay;
