import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import CarConfirmationHeader from './CarConfirmationHeader';
import CarCancelledBody from './CarCancelledBody';

interface CarCancelledDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  Category: CategoryOption;
}

const CarCancelledDisplay = ({
  item,
  primaryContact,
  Category,
}: CarCancelledDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<CarConfirmationHeader item={item} icon={Category.icon} />}
      body={<CarCancelledBody item={item} primaryContact={primaryContact} />}
    />
  );
};

export default CarCancelledDisplay;
