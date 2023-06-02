import React from 'react';
import FlightsConfirmationHeader from './FlightsConfirmationHeader';
import FlightsConfirmationBody from './FlightsConfirmationBody';
import { Item } from 'types/booking/bookingType';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Heading } from '@simplenight/ui';
import { CategoryOption } from 'types/search/SearchTypeOptions';

import FlightsConfirmationDetails from './FlightsConfirmationDetails';

interface Props {
  item?: Item;
  Category: CategoryOption;
}

const FlightsConfirmationAccordion = ({ item }: Props) => {
  return (
    <div className="border border-dark-300 rounded">
      <FlightsConfirmationHeader item={item} />
      <FlightsConfirmationDetails item={item} />
      <div className="px-4">
        <CollapseUnbordered
          title={<Heading tag="h5">Price Breakdown</Heading>}
          body={<FlightsConfirmationBody item={item} />}
        />
      </div>
    </div>
  );
};

export default FlightsConfirmationAccordion;
