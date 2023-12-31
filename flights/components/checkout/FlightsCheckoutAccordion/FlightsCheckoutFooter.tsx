import { Paragraph, Pricing } from '@simplenight/ui';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import React from 'react';

const FlightsCheckoutFooter = ({ flight }: { flight: FlightItem }) => {
  const totalFlightAmount = flight.offer?.totalFareAmount || '0';
  return (
    <div className="flex items-center justify-between">
      <Paragraph size="small">Total</Paragraph>
      <Pricing>
        <Pricing.Total totalAmount={`US$${totalFlightAmount}`} />
        <Pricing.TaxesAndFees />
      </Pricing>
    </div>
  );
};

export default FlightsCheckoutFooter;
