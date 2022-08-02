import { Dispatch, SetStateAction } from 'react';

import ConfirmationItem from '../ConfirmationItem/ConfirmationItem';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationItemListProps {
  booking: Booking;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItemList = ({
  booking,
  loading,
  setLoading,
}: ConfirmationItemListProps) => {
  const primaryContact = booking.primary_contact;

  return (
    <section className="grid lg:gap-6 lg:p-6">
      {booking.items.map((item, index) => {
        const isBooked = item.status == 'booked';
        if (!isBooked) return null;
        return (
          <section key={index}>
            <ConfirmationItem
              item={item}
              primaryContact={primaryContact}
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
