import { Dispatch, SetStateAction } from 'react';

import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CarBreakdownBody from './CarBreakdownBody';
import CarBreakdownHeader from './CarBreakdownHeader';

interface CarBreakdownDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const CarBreakdownDisplay = ({
  item,
  reload,
  setReload,
  Category,
}: CarBreakdownDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<CarBreakdownHeader item={item} icon={Category.icon} />}
      body={
        <CarBreakdownBody item={item} reload={reload} setReload={setReload} />
      }
    />
  );
};

export default CarBreakdownDisplay;
