import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';
import FlightConfirmationHeader from './FlightConfirmationHeader';
import FlightCancelledBody from './FlightCancelledBody';

interface FlightCancelledDisplayProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  Category: CategoryOption;
}

const FlightCancelledDisplay = ({
  item,
  primaryContact,
  Category,
}: FlightCancelledDisplayProps) => {
  return (
    <CollapseUnbordered
      title={<FlightConfirmationHeader item={item} icon={Category.icon} />}
      body={<FlightCancelledBody item={item} primaryContact={primaryContact} />}
    />
  );
};

export default FlightCancelledDisplay;
