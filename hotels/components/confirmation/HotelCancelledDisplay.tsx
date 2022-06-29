import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import HotelConfirmationHeader from './HotelConfirmationHeader';
import HotelCancelledBody from './HotelCancelledBody';

interface HotelCancelledDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  Category: CategoryOption;
}

const HotelCancelledDisplay = ({
  item,
  primaryContact,
  Category,
}: HotelCancelledDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelConfirmationHeader item={item} icon={Category.icon} />}
      body={<HotelCancelledBody item={item} primaryContact={primaryContact} />}
    />
  );
};

export default HotelCancelledDisplay;
