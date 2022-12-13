import { Item, PrimaryContact } from 'types/booking/bookingType';
import FlightGeneralInfo from './FlightGeneralInfo';
import FlightCustomerInfo from './FlightCustomerInfo';
import FlightRefundInfo from './FlightRefundInfo';

interface FlightCancelledBodyProps {
  item?: Item;
  primaryContact?: PrimaryContact;
}

const FlightCancelledBody = ({
  item,
  primaryContact,
}: FlightCancelledBodyProps) => {
  return (
    <section className="ml-[52px] border-t border-dark-300 lg:border-0">
      <FlightCustomerInfo item={item} primaryContact={primaryContact} />
      <FlightGeneralInfo item={item} />
      <FlightRefundInfo item={item} />
    </section>
  );
};

export default FlightCancelledBody;
