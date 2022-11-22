import { Dispatch, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { Item } from 'types/cart/CartType';
import ThingItineraryHeader from './ThingItineraryHeader';
import ThingItineraryBody from './ThingItineraryBody';
import ThingItineraryFooter from './ThingItineraryFooter';

interface ThingsItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const ThingItineraryDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
}: ThingsItineraryDisplayProps) => {
  return (
    <CollapseBordered
      title={<ThingItineraryHeader icon={Category.icon} item={item} />}
      body={<ThingItineraryBody item={item} />}
      footer={
        <ThingItineraryFooter
          item={item}
          reload={reload}
          setReload={setReload}
        />
      }
    />
  );
};

export default ThingItineraryDisplay;
