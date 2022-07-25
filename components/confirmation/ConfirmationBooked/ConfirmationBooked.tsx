import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import { Booking } from 'types/booking/bookingType';
import ConfirmationItemList from '../ConfirmationItemList/ConfirmationItemList';

interface ConfirmationBookedProps {
  booking: Booking;
  bookedAmount: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationBooked = ({
  booking,
  bookedAmount,
  loading,
  setLoading,
}: ConfirmationBookedProps) => {
  const [t, i18next] = useTranslation('global');
  const bookedItinerary = t('bookedItinerary', 'Booked Itinerary');
  const item = t('item', 'Item');
  const items = t('items', 'Items');

  const bookedItemsAmountLabel = bookedAmount == 1 ? item : items;

  return (
    <section className="flex flex-col gap-2 px-5 pt-6 border-b border-dark-300">
      <section className="flex items-center justify-between">
        <h1 className="font-semibold text-dark-800 text-lg leading-[24px]">
          {bookedItinerary}
        </h1>
        <p className="font-semibold text-dark-800 text-xs leading-lg">
          {bookedAmount} {bookedItemsAmountLabel}
        </p>
      </section>
      <ConfirmationItemList
        booking={booking}
        loading={loading}
        setLoading={setLoading}
      />
    </section>
  );
};

export default ConfirmationBooked;
