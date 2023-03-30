// types
import { Dispatch, SetStateAction } from 'react';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
// components
import ShowsItineraryBody from '../itinerary/ShowsItineraryBody';
import ShowsItineraryHeader from '../itinerary/ShowsItineraryHeader';
import ShowsItineraryFooter from '../itinerary/ShowsItineraryFooter';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';

interface ShowsBreakdownDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  showCollapse?: boolean;
}
const ShowsBreakdownDisplay = ({
  item = {},
  reload,
  setReload,
  Category,
  showCollapse = true,
}: ShowsBreakdownDisplayProps) => {
  return (
    <>
      {showCollapse ? (
        <CollapseBordered
          title={<ShowsItineraryHeader icon={Category.icon} item={item} />}
          body={<ShowsItineraryBody item={item} />}
          footer={
            <ShowsItineraryFooter
              item={item}
              setReload={setReload}
              reload={reload}
              fullWidth
            />
          }
        />
      ) : (
        <ShowsItineraryBody item={item} />
      )}
    </>
  );
};

export default ShowsBreakdownDisplay;
