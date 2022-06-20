import { Dispatch, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import HotelItineraryHeader from './HotelItineraryHeader';
import HotelItineraryBody from './HotelItineraryBody';
import HotelItineraryFooter from './HotelItineraryFooter';
import { Item } from 'types/cart/CartType';

interface HotelItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const HotelItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: HotelItineraryDisplayProps) => {
  return (
    <CollapseBordered
      title={<HotelItineraryHeader item={item} icon={Category.icon} />}
      body={
        <HotelItineraryBody item={item} reload={reload} setReload={setReload} />
      }
      footer={
        <HotelItineraryFooter
          item={item}
          reload={reload}
          setReload={setReload}
        />
      }
    />
  );
};

export default HotelItineraryDisplay;
