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
    <section className="text-right text-xs">
      {discount && (
        <p>
          <span className="text-dark-700 line-through font-normal">
            {amountBeforeDiscount}
          </span>{' '}
          <span className="text-green-1000 font-semibold">{discount} Off</span>
        </p>
      )}
      <p className=" text-dark-1000text-sm font-semibold">{totalAmount}</p>
    </section>
  );
};

export default ThingItineraryPriceBreakdown;
