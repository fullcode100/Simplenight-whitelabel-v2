import { Dispatch, SetStateAction } from 'react';

import ConfirmationItem from '../ConfirmationItem/ConfirmationItem';
import { Item, Payment } from 'types/booking/bookingType';

interface ConfirmationItemListProps {
  bookingItemsList: Item[];
  payment?: Payment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItemList = ({
  bookingItemsList,
  payment,
  loading,
  setLoading,
}: ConfirmationItemListProps) => {
  return (
    <section className="grid lg:gap-6 lg:p-6">
      {booking.items.map((item, index) => {
        const isBooked = item.status == 'booked';
        if (!isBooked) return null;
        return (
          <section key={index}>
            <ConfirmationItem
              item={item}
              payment={payment}
              loading={loading}
              setLoading={setLoading}
            />
          </section>
        );
      })}
    </section>
  );
};

export default ConfirmationItemList;
