import { Paragraph, Pricing } from '@simplenight/ui';
import React from 'react';
import { Flight } from 'flights/types/response/FlightSearchResponse';

const FlightsCheckoutFooter = ({ flight }: { flight: Flight }) => {
  const totalAmount = flight.availability.rate.total.full.formatted;
  return (
    <div className="flex items-center justify-between">
      <Paragraph size="small">Total</Paragraph>
      <Pricing>
        <Pricing.Total totalAmount={totalAmount} />
        <Pricing.TaxesAndFees />
      </Pricing>
    </div>
  );
};

export default FlightsCheckoutFooter;
