import { Dispatch, SetStateAction } from 'react';
import { Item } from 'types/cart/CartType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import DiningItineraryHeader from '../itinerary/DiningItineraryHeader';
import DiningItineraryBody from '../itinerary/DiningItineraryBody';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import DiningItineraryFooter from '../itinerary/DiningItineraryFooter';

interface DiningBreakdownDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
  showCollapse?: boolean;
}

const DiningBreakdownDisplay = ({
  item,
  reload,
  setReload,
  Category,
  showCollapse = true,
}: DiningBreakdownDisplayProps) => {
  return (
    <>
      {showCollapse ? (
        <CollapseBordered
          title={
            <DiningItineraryHeader
              item={item}
              icon={Category.icon}
              name={item?.item_data?.name}
              amount={item?.booking_data?.covers}
            />
          }
          body={
            <DiningItineraryBody
              item={item}
              time={item?.booking_data?.time}
              date={item?.booking_data?.date}
              covers={item?.booking_data?.covers}
              reload={reload}
              setReload={setReload}
            />
          }
          footer={
            <DiningItineraryFooter
              item={item}
              setReload={setReload}
              reload={reload}
              fullWidth
            />
          }
        />
      ) : (
        <DiningItineraryBody
          item={item}
          time={item?.booking_data?.time}
          date={item?.booking_data?.date}
          covers={item?.booking_data?.covers}
        />
      )}
    </>
  );
};

export default DiningBreakdownDisplay;
