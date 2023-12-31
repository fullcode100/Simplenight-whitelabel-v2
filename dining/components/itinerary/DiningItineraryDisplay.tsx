import React, { Dispatch, SetStateAction } from 'react';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item } from 'types/cart/CartType';
import DiningItineraryHeader from './DiningItineraryHeader';
import DiningItineraryFooter from './DiningItineraryFooter';
import DiningItineraryDisclaimer from './DiningItineraryDisclaimer';
import DiningItineraryBody from './DiningItineraryBody';

interface DiningItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const DiningItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: DiningItineraryDisplayProps) => {
  return (
    <CollapseBordered
      disclaimer={<DiningItineraryDisclaimer item={item} />}
      title={
        <DiningItineraryHeader
          item={item}
          icon={Category.icon}
          name={item?.item_data?.name}
          amount={item?.booking_data?.covers}
        />
      }
      body={
        <DiningItineraryBody
          item={item}
          time={item?.booking_data?.time}
          date={item?.booking_data?.date}
          covers={item?.booking_data?.covers}
        />
      }
      footer={
        <DiningItineraryFooter
          item={item}
          setReload={setReload}
          reload={reload}
        />
      }
    />
  );
};

export default DiningItineraryDisplay;
