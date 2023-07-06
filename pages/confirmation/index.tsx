/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import useQuery from 'hooks/pageInteraction/useQuery';
import { getBookingId } from 'core/client/services/BookingService';
import { cancelBooking } from 'core/client/services/BookingService';

import { useRouter } from 'next/router';
import ConfirmationPage from 'components/confirmation/ConfirmationPage/ConfirmationPage';
import { useGA4 } from 'hooks/ga4/useGA4';
import { TRACK_ACTION, TRACK_CATEGORY, TRACK_LABEL } from 'constants/events';

const Confirmation: NextPage = () => {
  const router = useRouter();
  const { trackEvent } = useGA4();
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

  useEffect(() => {
    trackEvent({
      label: TRACK_LABEL.RECEIPT,
      category: TRACK_CATEGORY.ALL,
      value: 'cancel',
      action: TRACK_ACTION.SET,
    });
  }, [bookingId, trackEvent]);

  const handleCancelBooking = () => {
    setLoading(true);
    trackEvent({
      label: TRACK_LABEL.RECEIPT,
      category: TRACK_CATEGORY.ALL,
      value: 'cancel',
      action: TRACK_ACTION.CLICK,
    });

    cancelBooking(i18next, bookingId)
      .then(() => {
        trackEvent({
          label: TRACK_LABEL.RECEIPT,
          category: TRACK_CATEGORY.ALL,
          value: 'cancel',
          action: TRACK_ACTION.SUCCESS,
        });
        router.reload();
        setLoading(false);
      })
      .catch(() => {
        trackEvent({
          label: TRACK_LABEL.RECEIPT,
          category: TRACK_CATEGORY.ALL,
          value: 'cancel',
          action: TRACK_ACTION.ERROR,
        });
      });
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
