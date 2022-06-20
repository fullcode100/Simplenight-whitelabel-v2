import { Item, PrimaryContact } from 'types/booking/bookingType';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelCustomerInfo from './HotelCustomerInfo';
import HotelRoomsInfo from './HotelRoomsInfo';

interface HotelConfirmationBodyProps {
  item?: Item;
  primaryContact?: PrimaryContact;
}

const HotelConfirmationBody = ({
  item,
  primaryContact,
}: HotelConfirmationBodyProps) => {
  return (
    <section className="border-t border-dark-300">
      <HotelCustomerInfo item={item} primaryContact={primaryContact} />
      <HotelGeneralInfo item={item} primaryContact={primaryContact} />
      <HotelRoomsInfo item={item?.extra_data} />
    </section>
  );
};

export default HotelConfirmationBody;
