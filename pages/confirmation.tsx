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

const Confirmation: NextPage = () => {
  const [booking, setBooking] = useState<Booking | undefined>(undefined);
  const [bookingId, setBookingId] = useState('');
  const [t, i18next] = useTranslation('global');
  const bookedItinerary = t('bookedItinerary', 'Booked Itinerary');

  const bookingIdParams = useQuery().bookingId;

  useEffect(() => {
    setBookingId(bookingIdParams?.toString() || '');
  }, [bookingIdParams]);

  useEffect(() => {
    if (bookingId) {
      getBookingId(i18next, bookingId).then((response) => {
        if (response?.booking) {
          setBooking(response?.booking);
        }
      });
    }
  }, [bookingId]);

  return (
    <main>
      <header>
        <ConfirmationHeader booking={booking} />
      </header>

      {booking && (
        <section>
          <section className="flex flex-col gap-2 px-5 pt-5 border-b border-dark-300">
            <PageTitle
              title={bookedItinerary}
              productsAmount={booking.items.length}
            />
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
