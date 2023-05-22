import { Item } from 'types/booking/bookingType';
import CarGeneralInfo from './CarGeneralInfo';
import CarCustomerInfo from './CarCustomerInfo';
import CarRefundInfo from './CarRefundInfo';

interface CarCancelledBodyProps {
  item?: Item;
}

const CarCancelledBody = ({ item }: CarCancelledBodyProps) => {
  return (
    <section className="ml-[52px] border-t border-dark-300 lg:border-0">
      <CarCustomerInfo item={item} />
      <CarGeneralInfo item={item} />
      <CarRefundInfo item={item} />
    </section>
  );
};

export default CarCancelledBody;
