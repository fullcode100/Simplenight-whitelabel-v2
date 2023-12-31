import { Dispatch, SetStateAction } from 'react';

import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import HotelItineraryHeader from './HotelItineraryHeader';
import HotelItineraryBody from './HotelItineraryBody';
import HotelItineraryFooter from './HotelItineraryFooter';
import { Item } from '../../types/response/CartHotels';

interface HotelItineraryDisplayProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  Category: CategoryOption;
}

const HotelItineraryDisplay = ({
  item,
  reload,
  setReload,
  Category,
}: HotelItineraryDisplayProps) => {
  return (
    <>
      {item && (
        <CollapseBordered
          disclaimer={null}
          title={<HotelItineraryHeader item={item} icon={Category.icon} />}
          body={<HotelItineraryBody item={item} />}
          footer={
            <HotelItineraryFooter
              item={item}
              reload={reload}
              setReload={setReload}
            />
          }
          isOpen={true}
        />
      )}
    </>
  );
};

export default HotelItineraryDisplay;
