import { Dispatch, SetStateAction } from 'react';

import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import FlightBreakdownBody from './FlightBreakdownBody';
import FlightBreakdownHeader from './FlightBreakdownHeader';

interface FlightBreakdownDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const FlightBreakdownDisplay = ({
  item,
  reload,
  setReload,
  Category,
}: FlightBreakdownDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<FlightBreakdownHeader item={item} icon={Category.icon} />}
      body={
        <FlightBreakdownBody item={item} reload={reload} setReload={setReload} />
      }
    />
  );
};

export default FlightBreakdownDisplay;
