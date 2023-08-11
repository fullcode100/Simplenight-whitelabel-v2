/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import useQuery from 'hooks/pageInteraction/useQuery';
import { getBookingId } from 'core/client/services/BookingService';
import { cancelBooking } from 'core/client/services/BookingService';

import { useRouter } from 'next/router';
import ConfirmationPage from 'components/confirmation/ConfirmationPage/ConfirmationPage';

const Confirmation: NextPage = () => {
  const router = useRouter();
  const { bookingId: bookingIdParams, lookup } = useQuery();
  const bookingId = bookingIdParams?.toString() || '';
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [t, i18next] = useTranslation('global');

  const fromLookup = lookup == 'true';

  const { data: booking, isLoading } = useReactQuery(
    ['booking', bookingId],
    async () => {
      const data = await getBookingId(i18next, bookingId);
      return data?.booking;
    },
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );

  const handleCancelBooking = async () => {
    const bookingId = booking?.booking_id;
    setLoading(true);
    if (bookingId) {
      await cancelBooking(i18next, bookingId, '/flights/bookings/cancel');
      router.reload();
    }
    setLoading(false);
  };

  return (
    <ConfirmationPage
      booking={booking}
      isLoading={isLoading}
      fromLookup={fromLookup}
      handleCancelBooking={handleCancelBooking}
      loading={loading}
      setLoading={setLoading}
      reload={reload}
      setReload={setReload}
    />
  );
};

export default Confirmation;
