import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import CarGeneralInfo from './CarGeneralInfo';
import CarCustomerInfo from './CarCustomerInfo';
import CarRoomsInfo from './CarRoomsInfo';

interface CarConfirmationBodyProps {
  item?: Item;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const CarConfirmationBody = ({
  item,
  loading,
  setLoading,
}: CarConfirmationBodyProps) => {
  return (
    <section className="border-t lg:border-0 border-dark-300">
      <CarRoomsInfo item={item} loading={loading} setLoading={setLoading} />
    </section>
  );
};

export default CarConfirmationBody;
