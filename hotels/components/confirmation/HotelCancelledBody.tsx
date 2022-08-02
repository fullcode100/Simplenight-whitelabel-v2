import { Item } from 'types/booking/bookingType';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelCustomerInfo from './HotelCustomerInfo';
import HotelRefundInfo from './HotelRefundInfo';

interface HotelCancelledBodyProps {
  item?: Item;
}

const HotelCancelledBody = ({ item }: HotelCancelledBodyProps) => {
  return (
    <section className="ml-[52px] border-t border-dark-300 lg:border-0">
      <HotelCustomerInfo item={item} primaryContact={primaryContact} />
      <HotelGeneralInfo item={item} />
      <HotelRefundInfo item={item} />
    </section>
  );
};

export default HotelCancelledBody;
