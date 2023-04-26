import React from 'react';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import FlightsCheckoutHeader from './FlightsCheckoutHeader';
import FlightsCheckoutBody from './FlightsCheckoutBody';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import FlightsCheckoutFooter from './FlightsCheckoutFooter';

const FlightsCheckoutAccordion = ({ flight }: { flight: Flight }) => {
  return (
    <CollapseBordered
      title={<FlightsCheckoutHeader flight={flight} />}
      body={<FlightsCheckoutBody flight={flight} />}
      footer={<FlightsCheckoutFooter flight={flight} />}
    />
  );
};

export default FlightsCheckoutAccordion;
