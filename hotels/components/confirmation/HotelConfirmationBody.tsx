import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelCustomerInfo from './HotelCustomerInfo';
import HotelRoomsInfo from './HotelRoomsInfo';

interface HotelConfirmationBodyProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const HotelConfirmationBody = ({
  item,
  primaryContact,
  loading,
  setLoading,
}: HotelConfirmationBodyProps) => {
  return (
    <section className="ml-[52px] border-t lg:border-0 border-dark-300">
      <HotelCustomerInfo item={item} primaryContact={primaryContact} />
      <HotelGeneralInfo item={item} />
      <HotelRoomsInfo item={item} loading={loading} setLoading={setLoading} />
    </section>
  );
};

export default HotelConfirmationBody;
