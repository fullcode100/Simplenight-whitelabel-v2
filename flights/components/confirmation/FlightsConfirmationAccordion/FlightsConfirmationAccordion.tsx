import React from 'react';
import FlightsConfirmationHeader from './FlightsConfirmationHeader';
import FlightsConfirmationBody from './FlightsConfirmationBody';
import { Item } from 'types/booking/bookingType';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Heading } from '@simplenight/ui';
import { CategoryOption } from 'types/search/SearchTypeOptions';

import FlightsConfirmationDetails from './FlightsConfirmationDetails';
import { useTranslation } from 'react-i18next';

interface Props {
  item?: Item;
  Category: CategoryOption;
}

const FlightsConfirmationAccordion = ({ item }: Props) => {
  const [t] = useTranslation('flights');
  const priceBreakdownLabel = t('priceBreakdown', 'Price Breakdown');
  return (
    <div className="border border-dark-300 rounded">
      <FlightsConfirmationHeader item={item} />
      <FlightsConfirmationDetails item={item} />
      <div className="px-4">
        <CollapseUnbordered
          title={<Heading tag="h5">{priceBreakdownLabel}</Heading>}
          body={<FlightsConfirmationBody item={item} />}
        />
      </div>
    </div>
  );
};

export default FlightsConfirmationAccordion;
