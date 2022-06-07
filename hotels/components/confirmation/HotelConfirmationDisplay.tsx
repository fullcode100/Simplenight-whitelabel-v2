import { Item } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import HotelConfirmationHeader from './HotelConfirmationHeader';
import HotelConfirmationBody from './HotelConfirmationBody';

interface HotelConfirmationDisplayProps {
  item?: Item;
  Category: CategoryOption;
}

const HotelConfirmationDisplay = ({
  item,
  Category,
}: HotelConfirmationDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelConfirmationHeader item={item} icon={Category.icon} />}
      body={<HotelConfirmationBody item={item} />}
    />
  );
};

export default HotelConfirmationDisplay;
