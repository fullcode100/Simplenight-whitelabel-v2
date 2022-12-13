import { Item, PrimaryContact } from 'types/booking/bookingType';
import CarGeneralInfo from './CarGeneralInfo';
import CarCustomerInfo from './CarCustomerInfo';
import CarRefundInfo from './CarRefundInfo';

interface CarCancelledBodyProps {
  item?: Item;
  primaryContact?: PrimaryContact;
}

const CarCancelledBody = ({ item, primaryContact }: CarCancelledBodyProps) => {
  return (
    <section className="ml-[52px] border-t border-dark-300 lg:border-0">
      <CarCustomerInfo item={item} primaryContact={primaryContact} />
      <CarGeneralInfo item={item} />
      <CarRefundInfo item={item} />
    </section>
  );
};

export default CarCancelledBody;
