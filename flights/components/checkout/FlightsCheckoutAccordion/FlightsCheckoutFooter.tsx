import { Paragraph, Pricing } from '@simplenight/ui';
import React from 'react';
import { FlightItem } from 'pages/api/flights';

const FlightsCheckoutFooter = ({ flight }: { flight: FlightItem }) => {
  const totalFlightAmount = flight.offers?.[0].totalAmount || '0';
  return (
    <div className="flex items-center justify-between">
      <Paragraph size="small">Total</Paragraph>
      <Pricing>
        <Pricing.Total totalAmount={totalFlightAmount} />
        <Pricing.TaxesAndFees />
      </Pricing>
    </div>
  );
};

export default FlightsCheckoutFooter;
