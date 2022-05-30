import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import HotelItineraryHeader from './HotelItineraryHeader';
import HotelItineraryBody from './HotelItineraryBody';
import HotelItineraryFooter from './HotelItineraryFooter';
import { Item } from 'types/cart/CartType';

interface HotelItineraryDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const HotelItineraryDisplay = ({
  item = {},
  Category,
}: HotelItineraryDisplayProps) => {
  return (
    <CollapseBordered
      title={<HotelItineraryHeader item={item} icon={Category.icon} />}
      body={<HotelItineraryBody item={item} />}
      footer={<HotelItineraryFooter item={item} />}
    />
  );
};

export default HotelItineraryDisplay;
