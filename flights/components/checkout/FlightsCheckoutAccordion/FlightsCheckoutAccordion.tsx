import React from 'react';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import FlightsCheckoutHeader from './FlightsCheckoutHeader';
import FlightsCheckoutBody from './FlightsCheckoutBody';
import FlightsCheckoutFooter from './FlightsCheckoutFooter';
import { Search } from 'hooks/flights/useSearchStore';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';

interface Props {
  flight: FlightItem;
  search: Search;
}

const FlightsCheckoutAccordion = ({ flight, search }: Props) => {
  return (
    <CollapseBordered
      title={<FlightsCheckoutHeader search={search} />}
      body={<FlightsCheckoutBody flight={flight} search={search} />}
      footer={<FlightsCheckoutFooter flight={flight} />}
    />
  );
};

export default FlightsCheckoutAccordion;
