import React from 'react';

const BreakdownSummary = () => {
  return (
    <section className="flex justify-between items-center">
      <section className="text-sm text-dark-1000">
        <p>2 Nights</p>
        <p>2 Guests</p>
      </section>
      <section className="text-right">
        <p className="text-primary-1000 text-xs">
          <span className="text-dark-800 line-through">$250.00</span> 25% Off
        </p>
        <p className="text-sm text-dark-1000 font-semibold">$199.99</p>
        <p className="text-dark-800 text-xs">Includes Taxes and Fees</p>
      </section>
    </section>
  );
};

export default BreakdownSummary;
