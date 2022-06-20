import { Dispatch, SetStateAction } from 'react';

import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HotelBreakdownBody from './HotelBreakdownBody';
import HotelBreakdownHeader from './HotelBreakdownHeader';

interface HotelBreakdownDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const HotelBreakdownDisplay = ({
  item,
  reload,
  setReload,
  Category,
}: HotelBreakdownDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelBreakdownHeader item={item} icon={Category.icon} />}
      body={
        <HotelBreakdownBody item={item} reload={reload} setReload={setReload} />
      }
    />
  );
};

export default HotelBreakdownDisplay;
