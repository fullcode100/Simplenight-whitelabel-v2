import { Item } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import { ThingBreakdownHeader } from './ThingBreakdownHeader';
import ThingBreakdowBody from './ThingBreakdownBody';

interface ThingCancelledDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const ThingCancelledDisplay = ({
  item,
  Category,
}: ThingCancelledDisplayProps) => {
  return item ? (
    <CollapseUnbordered
      title={<ThingBreakdownHeader item={item} icon={Category.icon} />}
      body={<ThingBreakdowBody item={item} />}
    />
  ) : (
    <></>
  );
};

export default ThingCancelledDisplay;
