import React from 'react';
import PriceDisplay from 'components/global/PriceDisplay/PriceDisplay';
import { Rate } from '../../../../hotels/types/response/SearchResponse';

interface BreakdownSummaryProps {
  rate: Rate;
}

const BreakdownSummary = ({ rate }: BreakdownSummaryProps) => {
  return (
    <section className="flex justify-between items-center">
      <section className="text-sm text-dark-1000">
        <p>2 Nights</p>
        <p>2 Guests</p>
      </section>
      <section className="text-right">
        <PriceDisplay rate={rate} />
        <p className="text-dark-800 text-xs">Includes Taxes and Fees</p>
      </section>
    </section>
  );
};

export default BreakdownSummary;
