import { Dispatch, SetStateAction } from 'react';

import ConfirmationItem from '../ConfirmationItem/ConfirmationItem';
import { Item, Payment, PrimaryContact } from 'types/booking/bookingType';

interface ConfirmationItemListProps {
  bookingItemsList: Item[];
  primaryContact?: PrimaryContact;
  payment?: Payment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationItemList = ({
  bookingItemsList,
  primaryContact,
  payment,
  loading,
  setLoading,
}: ConfirmationItemListProps) => {
  return (
    <section className="grid lg:gap-6 lg:p-6">
      {bookingItemsList.map((item, index) => {
        const isBooked = item.status == 'booked';
        if (!isBooked) return null;
        return (
          <section key={index}>
            <ConfirmationItem
              item={item}
              primaryContact={primaryContact}
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
