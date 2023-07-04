import React from 'react';
import FlightsCheckoutHeader from './FlightsCheckoutHeader';
import FlightsCheckoutBody from './FlightsCheckoutBody';
import { Search } from 'hooks/flights/useSearchStore';
import { FlightItem } from 'flights/types/response/FlightSearchResponseMS';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Heading } from '@simplenight/ui';

import FlightsCheckoutDetails from './FlightsCheckoutDetails';
import { useTranslation } from 'react-i18next';

interface Props {
  flights: FlightItem[];
  search: Search;
}

const FlightsCheckoutAccordion = ({ flights, search }: Props) => {
  const [t] = useTranslation('flights');
  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');
  return (
    <div className="border border-dark-300 rounded">
      <FlightsCheckoutHeader search={search} />
      <FlightsCheckoutDetails flights={flights} />
      <div className="px-4">
        <CollapseUnbordered
          title={<Heading tag="h5">{priceBreakdownLabel}</Heading>}
          body={<FlightsCheckoutBody flights={flights} search={search} />}
        />
      </div>
    </div>
  );
};

export default FlightsCheckoutAccordion;
