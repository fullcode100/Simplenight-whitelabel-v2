import Paragraph from 'components/global/Typography/Paragraph';
import React from 'react';

interface ItineraryPriceBreakdownProps {
  totalAmount: string;
  discount?: string;
  amountBeforeDiscount?: string;
}

const ThingItineraryPriceBreakdown = ({
  totalAmount,
  discount,
  amountBeforeDiscount,
}: ItineraryPriceBreakdownProps) => {
  return (
    <section className="text-xs text-right">
      {discount && (
        <p>
          <span className="font-normal line-through text-dark-700">
            {amountBeforeDiscount}
          </span>{' '}
          <span className="font-semibold text-green-1000">{discount} Off</span>
        </p>
      )}
      <Paragraph size="small" fontWeight="semibold">
        {totalAmount}
      </Paragraph>
    </section>
  );
};

export default ThingItineraryPriceBreakdown;
