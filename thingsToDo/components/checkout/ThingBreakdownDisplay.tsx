// types
import { Dispatch, SetStateAction } from 'react';
import { Customer, Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
// mock
import ThingItineraryFooter from '../itinerary/ThingItineraryFooter';
import { ThingBreakdownHeader } from './ThingBreakdownHeader';
import ThingBreakdownBody from './ThingBreakdownBody';
import ThingItineraryBody from '../itinerary/ThingItineraryBody';

interface ThingBreakdownDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  showCollapse?: boolean;
  customer?: Customer;
}
const ThingBreakdownDisplay = ({
  item = {},
  customer,
  reload,
  setReload,
  Category,
  showCollapse = true,
}: ThingBreakdownDisplayProps) => {
  return (
    <>
      {showCollapse ? (
        <CollapseBordered
          title={<ThingBreakdownHeader icon={Category.icon} item={item} />}
          body={
            <ThingItineraryBody
              item={item}
              reload={reload}
              setReload={setReload}
            />
          }
          footer={
            <ThingItineraryFooter
              item={item}
              setReload={setReload}
              reload={reload}
              fullWidth
            />
          }
        />
      ) : (
        <ThingBreakdownBody
          item={item}
          reload={reload}
          setReload={setReload}
          useCollapse={!showCollapse && false}
          customer={customer}
        />
      )}
    </>
  );
};

export default ThingBreakdownDisplay;
