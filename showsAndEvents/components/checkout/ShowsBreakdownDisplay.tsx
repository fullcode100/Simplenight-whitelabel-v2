// types
import { Dispatch, SetStateAction } from 'react';
import { Customer, Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import ShowsItineraryBody from '../itinerary/ShowsItineraryBody';
import ShowsItineraryHeader from '../itinerary/ShowsItineraryHeader';

interface ShowsBreakdownDisplayProps {
  item?: Item;
  Category: CategoryOption;
  showCollapse?: boolean;
}
const ShowsBreakdownDisplay = ({
  item = {},
  Category,
  showCollapse = true,
}: ShowsBreakdownDisplayProps) => {
  return (
    <>
      {showCollapse ? (
        <CollapseUnbordered
          title={<ShowsItineraryHeader icon={Category.icon} item={item} />}
          body={<ShowsItineraryBody item={item} />}
        />
      ) : (
        <ShowsItineraryBody item={item} />
      )}
    </>
  );
};

export default ShowsBreakdownDisplay;
