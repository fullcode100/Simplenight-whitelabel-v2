import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import FlightGeneralInfo from './FlightGeneralInfo';
import FlightCustomerInfo from './FlightCustomerInfo';
import FlightRoomsInfo from './FlightRoomsInfo';

interface FlightConfirmationBodyProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const FlightConfirmationBody = ({
  item,
  primaryContact,
  loading,
  setLoading,
}: FlightConfirmationBodyProps) => {
  return (
    <section className="ml-[52px] border-t lg:border-0 border-dark-300">
      <FlightCustomerInfo item={item} primaryContact={primaryContact} />
      <FlightGeneralInfo item={item} />
      <FlightRoomsInfo item={item} loading={loading} setLoading={setLoading} />
    </section>
  );
};

export default FlightConfirmationBody;
