import { Dispatch, SetStateAction } from 'react';

import { Item, Payment } from 'types/booking/bookingType';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelCustomerInfo from './HotelCustomerInfo';
import HotelRoomsInfo from './HotelRoomsInfo';

interface HotelConfirmationBodyProps {
  item?: Item;
  payment?: Payment;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const HotelConfirmationBody = ({
  item,
  payment,
  loading,
  setLoading,
}: HotelConfirmationBodyProps) => {
  return (
    <section className="ml-[52px] lg:pb-6 border-t lg:border-0 border-dark-300">
      <HotelCustomerInfo item={item} />
      <HotelGeneralInfo item={item} />
      <HotelRoomsInfo
        item={item}
        payment={payment}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
};

export default HotelConfirmationBody;
