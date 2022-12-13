import { Dispatch, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import FlightItineraryHeader from './FlightItineraryHeader';
import FlightItineraryBody from './FlightItineraryBody';
import FlightItineraryFooter from './FlightItineraryFooter';
import { Item } from 'types/cart/CartType';

interface FlightItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const FlightItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: FlightItineraryDisplayProps) => {
  return (
    <CollapseBordered
      title={<FlightItineraryHeader item={item} icon={Category.icon} />}
      body={<FlightItineraryBody item={item} />}
      footer={
        <FlightItineraryFooter
          item={item}
          reload={reload}
          setReload={setReload}
        />
      }
    />
  );
};

export default FlightItineraryDisplay;
