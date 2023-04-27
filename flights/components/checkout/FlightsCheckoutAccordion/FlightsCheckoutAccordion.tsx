import React from 'react';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import FlightsCheckoutHeader from './FlightsCheckoutHeader';
import FlightsCheckoutBody from './FlightsCheckoutBody';
import { Flight } from 'flights/types/response/FlightSearchResponse';
import FlightsCheckoutFooter from './FlightsCheckoutFooter';
import { Search } from 'hooks/flights/useSearchStore';

interface Props {
  flight: Flight;
  search: Search;
}

const FlightsCheckoutAccordion = ({ flight, search }: Props) => {
  return (
    <CollapseBordered
      title={<FlightsCheckoutHeader flight={flight} search={search} />}
      body={<FlightsCheckoutBody flight={flight} search={search} />}
      footer={<FlightsCheckoutFooter flight={flight} />}
    />
  );
};

export default FlightsCheckoutAccordion;
