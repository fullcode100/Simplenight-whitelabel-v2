import React from 'react';
import FlightsCheckoutHeader from './FlightsCheckoutHeader';
import FlightsCheckoutBody from './FlightsCheckoutBody';
import { Search } from 'hooks/flights/useSearchStore';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { IconWrapper, Paragraph } from '@simplenight/ui';

import FlightsCheckoutDetails from './FlightsCheckoutDetails';

interface Props {
  flights: FlightItem[];
  search: Search;
}

const FlightsCheckoutAccordion = ({ flights, search }: Props) => {
  return (
    <div className="border border-dark-300 rounded">
      <FlightsCheckoutHeader search={search} />
      <FlightsCheckoutDetails flights={flights} />
      <div className="px-4">
        <CollapseUnbordered
          title={<Paragraph fontWeight="semibold">Price Breakdown</Paragraph>}
          body={<div>hola</div>}
          // footer={<FlightsCheckoutFooter flight={flight} />}
        />
      </div>
    </div>
  );
};

export default FlightsCheckoutAccordion;

{
  /* <FlightsCheckoutBody flight={flight} search={search} /> */
}
