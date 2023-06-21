import { Dispatch, SetStateAction } from 'react';

import ConfirmationItem from '../ConfirmationItem/ConfirmationItem';
import { Item, Payment } from 'types/booking/bookingType';

interface ConfirmationItemListProps {
  bookingItemsList: Item[];
  payment?: Payment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  modalMode?: boolean;
}

const ConfirmationItemList = ({
  bookingItemsList,
  payment,
  loading,
  setLoading,
  reload,
  setReload,
  modalMode = false,
}: ConfirmationItemListProps) => {
  return (
    <section className="grid py-5 divide-y lg:px-6 divide-dark-300">
      {bookingItemsList.map((item, index) => {
        const isBooked = item.status == 'booked';
        if (!isBooked) return null;
        return (
          <section key={index}>
            <ConfirmationItem
              modalMode={modalMode}
              item={item}
              payment={payment}
              loading={loading}
              setLoading={setLoading}
              reload={reload}
              setReload={setReload}
            />
          </section>
        );
      })}
    </section>
  );
};

export default ConfirmationItemList;
