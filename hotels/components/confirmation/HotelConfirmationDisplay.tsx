import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import HotelConfirmationHeader from './HotelConfirmationHeader';
import HotelConfirmationBody from './HotelConfirmationBody';

interface HotelConfirmationDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  Category: CategoryOption;
}

const HotelConfirmationDisplay = ({
  item,
  primaryContact,
  Category,
}: HotelConfirmationDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<HotelConfirmationHeader item={item} icon={Category.icon} />}
      body={
        <HotelConfirmationBody item={item} primaryContact={primaryContact} />
      }
    />
  );
};

export default HotelConfirmationDisplay;
