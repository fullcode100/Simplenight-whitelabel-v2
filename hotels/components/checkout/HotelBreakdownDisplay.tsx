import { Dispatch, SetStateAction } from 'react';

import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HotelBreakdownBody from './HotelBreakdownBody';
import HotelBreakdownHeader from './HotelBreakdownHeader';

interface HotelBreakdownDisplayProps {
  item?: any;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  showCollapse?: boolean;
}

const HotelBreakdownDisplay = ({
  item,
  reload,
  setReload,
  Category,
  showCollapse = true,
}: HotelBreakdownDisplayProps) => {
  return (
    <>
      {showCollapse ? (
        <CollapseUnbordered
          title={<HotelBreakdownHeader item={item.item} icon={Category.icon} />}
          body={
            <HotelBreakdownBody
              item={item}
              reload={reload}
              setReload={setReload}
            />
          }
        />
      ) : (
        <HotelBreakdownBody
          item={item.item}
          reload={reload}
          setReload={setReload}
          useCollapse={!showCollapse && false}
        />
      )}
    </>
  );
};

export default HotelBreakdownDisplay;
