import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { Booking } from 'types/booking/bookingType';
import ConfirmationItemList from '../ConfirmationItemList/ConfirmationItemList';

interface ConfirmationBookedProps {
  booking: Booking;
  bookedAmount: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationBooked = ({
  booking,
  bookedAmount,
  loading,
  setLoading,
  reload,
  setReload,
}: ConfirmationBookedProps) => {
  const [t, i18next] = useTranslation('global');
  const bookedItinerary = t('bookedItinerary', 'Booked Itinerary');
  const item = t('item', 'Item');
  const items = t('items', 'Items');

  const bookedItemsAmountLabel = bookedAmount == 1 ? item : items;
  const payment = booking.payments[0];
  const bookingItemsList = booking.items;

  return (
    <section className="flex flex-col gap-2 lg:gap-0 px-5 lg:px-0 pt-6 lg:pt-0 lg:w-[845px] lg:shadow-container border-b border-dark-300 lg:border lg:rounded">
      <section className="flex items-center justify-between lg:p-6 lg:bg-dark-100 lg:border-b lg:border-dark-300">
        <h1 className="font-semibold text-dark-800 text-lg lg:text-[24px] leading-[24px] lg:leading-[29px]">
          {bookedItinerary}
        </h1>
        <p className="font-semibold text-dark-800 text-xs lg:text-sm leading-lg lg:leading-[22px]">
          {bookedAmount} {bookedItemsAmountLabel}
        </p>
      </section>
      <ConfirmationItemList
        bookingItemsList={bookingItemsList}
        payment={payment}
        loading={loading}
        setLoading={setLoading}
        reload={reload}
        setReload={setReload}
      />
    </section>
  );
};

export default ConfirmationBooked;
