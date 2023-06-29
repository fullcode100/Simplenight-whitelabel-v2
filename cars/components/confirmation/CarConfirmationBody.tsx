import { Dispatch, SetStateAction } from 'react';

import { Item } from 'types/booking/bookingType';
import CarRentalInfo from './CarRentalInfo';

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
      <CarRentalInfo item={item} loading={loading} setLoading={setLoading} />
    </section>
  );
};

export default CarConfirmationBody;
