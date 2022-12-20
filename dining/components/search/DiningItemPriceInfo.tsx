import React from 'react';
import PriceDisplay from '../PriceDisplay/PriceDisplay';

const DiningItemPriceInfo = () => {
  return (
    <section className="flex justify-end items-center border-t border-dark-300 py-2 px-4">
      <PriceDisplay price={'Free'} />
    </section>
  );
};

export default DiningItemPriceInfo;
