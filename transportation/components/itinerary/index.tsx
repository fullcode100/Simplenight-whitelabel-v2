import { Dispatch, FC, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item } from 'types/cart/CartType';
import { TransportationItineraryHeader } from './TransportationItineraryHeader';
import { TransportationItineraryBody } from './TransportationItineraryBody';
import { TransportationItineraryFooter } from './TransportationItineraryFooter';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';

interface Index {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

export const TransportationItineraryDisplay: FC<Index> = ({
  item = {},
  reload,
  setReload,
  Category,
}) => {
  return (
    <CollapseBordered
      title={<TransportationItineraryHeader item={item} icon={Category.icon} />}
      body={<TransportationItineraryBody item={item} />}
      footer={
        <TransportationItineraryFooter
          item={item}
          reload={reload}
          setReload={setReload}
        />
      }
    />
  );
};

export const TransportationBreakdownDisplay: FC<Index> = ({
  item = {},
  reload,
  setReload,
  Category,
}) => {
  return (
    <CollapseUnbordered
      title={<TransportationItineraryHeader item={item} icon={Category.icon} />}
      body={
        <TransportationItineraryBody
          breakdown
          item={item}
          reload={reload}
          setReload={setReload}
        />
      }
    />
  );
};
