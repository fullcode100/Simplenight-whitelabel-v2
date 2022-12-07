// types
import { Dispatch, SetStateAction } from 'react';
import { Customer } from 'types/cart/CartType';
import { Item } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { ThingBreakdownHeader } from './ThingBreakdownHeader';
import ThingBreakdownBody from './ThingBreakdownBody';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';

interface ThingCheckoutBreakdownDisplayProps {
  item?: Item | any;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  showCollapse?: boolean;
  customer?: Customer;
}
const ThingCheckoutBreakdownDisplay = ({
  item = {},
  customer,
  reload,
  setReload,
  Category,
  showCollapse = true,
}: ThingCheckoutBreakdownDisplayProps) => {
  return (
    <>
      {showCollapse ? (
        <CollapseUnbordered
          title={<ThingBreakdownHeader icon={Category.icon} item={item} />}
          body={
            <ThingBreakdownBody
              item={item}
              reload={reload}
              setReload={setReload}
              customer={customer}
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

export default ThingCheckoutBreakdownDisplay;
