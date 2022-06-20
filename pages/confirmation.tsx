import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import PageTitle from 'components/global/PageTitle/PageTitle';
import ConfirmationFooter from 'components/confirmation/ConfirmationFooter/ConfirmationFooter';
import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import ConfirmationItemList from 'components/confirmation/ConfirmationItemList/ConfirmationItemList';
import ConfirmationPayment from 'components/confirmation/ConfirmationPayment/ConfirmationPayment';
import useQuery from 'hooks/pageInteraction/useQuery';
import { getBookingId } from 'core/client/services/BookingService';
import { Booking } from 'types/booking/bookingType';
import Loader from 'components/global/Loader/Loader';

const Confirmation: NextPage = () => {
  const [booking, setBooking] = useState<Booking | undefined>(undefined);
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [t, i18next] = useTranslation('global');
  const bookedItinerary = t('bookedItinerary', 'Booked Itinerary');
  const itemsLabel = t('items', 'Items');

  const bookingIdParams = useQuery().bookingId;

  useEffect(() => {
    setBookingId(bookingIdParams?.toString() || '');
  }, [bookingIdParams]);

  useEffect(() => {
    if (bookingId) {
      setLoading(true);
      getBookingId(i18next, bookingId).then((response) => {
        if (response?.booking) {
          setBooking(response?.booking);
        }
        setLoading(false);
      });
    }
  }, [bookingId]);

  return (
    <main>
      {loading ? (
        <section className="p-5">
          <Loader />
        </section>
      ) : (
        <header>
          <ConfirmationHeader booking={booking} />
        </header>
      )}
      {!loading && booking && (
        <section>
          <section className="flex flex-col gap-2 px-5 pt-5 border-b border-dark-300">
            <section className="flex items-center justify-between">
              <h1 className="font-semibold text-dark-800 text-lg leading-[24px]">
                {bookedItinerary}
              </h1>
              <p className="font-semibold text-dark-800 text-xs leading-lg">
                {booking.items.length} {itemsLabel}
              </p>
            </section>
            <ConfirmationItemList booking={booking} />
          </section>
          <ConfirmationPayment booking={booking} />
          <ConfirmationFooter booking={booking} />
        </section>
      )}
    </main>
  );
};

export default Confirmation;
