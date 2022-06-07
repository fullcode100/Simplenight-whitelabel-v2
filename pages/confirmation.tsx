import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import ConfirmationFooter from 'components/confirmation/ConfirmationFooter/ConfirmationFooter';
import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import ConfirmationPayment from 'components/confirmation/ConfirmationPayment/ConfirmationPayment';
import useQuery from 'hooks/pageInteraction/useQuery';
import { getBookingId } from 'core/client/services/BookingService';
import { Booking } from 'types/booking/bookingType';
import Loader from 'components/global/Loader/Loader';
import ConfirmationCancelled from 'components/confirmation/ConfirmationCancelled/ConfirmationCancelled';
import ConfirmationBooked from 'components/confirmation/ConfirmationBooked/ConfirmationBooked';
import HelpSection from 'components/global/HelpSection/HelpSection';

const Confirmation: NextPage = () => {
  const [booking, setBooking] = useState<Booking | undefined>(undefined);
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [t, i18next] = useTranslation('global');

  const { bookingId: bookingIdParams, lookup } = useQuery();
  const fromLookup = lookup == 'true';

  const flatBookingItems = booking?.items
    .map((item) => (item.extra_data.items ? [...item.extra_data.items] : item))
    .flat();

  const bookedItemsAmount =
    flatBookingItems?.filter((item) => item.status == 'booked').length || 0;

  const cancelledItemsAmount =
    flatBookingItems?.filter((item) => item.status == 'cancelled').length || 0;

  const itemsAmount = bookedItemsAmount + cancelledItemsAmount;

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

  console.log(booking);
  return (
    <main>
      {loading ? (
        <section className="p-5">
          <Loader />
        </section>
      ) : (
        <header>
          <ConfirmationHeader
            booking={booking}
            fromLookup={fromLookup}
            itemsAmount={itemsAmount}
          />
        </header>
      )}
      {!loading && booking && (
        <section>
          <ConfirmationBooked
            booking={booking}
            loading={loading}
            setLoading={setLoading}
            bookedAmount={bookedItemsAmount}
          />

          {cancelledItemsAmount > 0 && (
            <ConfirmationCancelled
              booking={booking}
              cancelledAmount={cancelledItemsAmount}
            />
          )}

          <ConfirmationPayment booking={booking} />
          <ConfirmationFooter
            booking={booking}
            loading={loading}
            setLoading={setLoading}
            bookedAmount={bookedItemsAmount}
          />

          {fromLookup && <HelpSection />}
        </section>
      )}
    </main>
  );
};

export default Confirmation;
