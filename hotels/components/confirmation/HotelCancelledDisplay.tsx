import { Item } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import HotelConfirmationHeader from './HotelConfirmationHeader';
import HotelCancelledBody from './HotelCancelledBody';

interface HotelCancelledDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const HotelCancelledDisplay = ({
  item,
  Category,
}: HotelCancelledDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelConfirmationHeader item={item} icon={Category.icon} />}
      body={<HotelCancelledBody item={item} />}
    />
  );
};

export default HotelCancelledDisplay;
