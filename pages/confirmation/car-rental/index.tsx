/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { useQuery as useReactQuery } from '@tanstack/react-query';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import ConfirmationFooter from 'components/confirmation/ConfirmationFooter/ConfirmationFooter';
import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import ConfirmationPayment from 'components/confirmation/ConfirmationPayment/ConfirmationPayment';
import useQuery from 'hooks/pageInteraction/useQuery';
import { getBookingId } from 'core/client/services/BookingService';
import Loader from 'components/global/Loader/Loader';
import ConfirmationCancelled from 'components/confirmation/ConfirmationCancelled/ConfirmationCancelled';
import ConfirmationBooked from 'components/confirmation/ConfirmationBooked/ConfirmationBooked';
import { useSettings } from 'hooks/services/useSettings';
import { cancelBooking } from 'core/client/services/BookingService';

import EmailIcon from 'public/icons/assets/email.svg';
import PhoneCall from 'public/icons/assets/phone-call.svg';
import { Booking } from 'types/booking/bookingType';
import { useRouter } from 'next/router';

const Confirmation: NextPage = () => {
  // const [booking, setBooking] = useState<Booking | undefined>(undefined);
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
      const data = await getBookingId(i18next, bookingId, '/cars/bookings');
      return data?.booking;
    },
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  );

  const flatBookingItems = booking?.items
    .map((item) => (item.item_data ? item : item))
    .flat();

  const bookedItemsAmount =
    flatBookingItems?.filter((item) => item.status == 'booked').length || 0;

  const cancelledItemsAmount =
    flatBookingItems?.filter((item) => item.status == 'cancelled').length || 0;

  const itemsAmount = bookedItemsAmount + cancelledItemsAmount;

  const handleCancelBooking = () => {
    setLoading(true);
    cancelBooking(i18next, bookingId, '/cars/bookings/cancellation').then(
      () => {
        router.reload();
        setLoading(false);
      },
    );
  };

  const HelpSection = () => {
    const [t, i18next] = useTranslation('global');
    const helpTitle = t('needHelpTitle', 'Need some help?');
    const helpDescription = t(
      'needHelpDescription',
      'Email or call us to get support from our team.',
    );

    const { data: brandConfig } = useSettings();
    const { information } = brandConfig;
    const { customerSupportEmail, customerSupportPhone } = information || {};
    const { prefix, number } = customerSupportPhone || {};
    const customerSupportPhoneNumber = `${prefix} ${number}`;

    const handleLinkOpen = (url: string) => {
      window.open(url, '_blank');
    };

    interface HelpLinkProps {
      icon?: React.ReactNode;
      link?: string;
      text?: string;
    }
    const HelpLink = ({ icon, link = '', text }: HelpLinkProps) => (
      <section className="flex items-center justify-center gap-3 text-base font-semibold underline lg:justify-start text-primary-1000">
        <section className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary-1000">
          {icon}
        </section>
        <button onClick={() => handleLinkOpen(link)}>{text}</button>
      </section>
    );

    return (
      <section className="px-5 py-6 lg:p-0 bg-dark-100">
        <section className="flex flex-col gap-3 p-6 text-center bg-white border font-lato lg:p-8 lg:gap-4 shadow-container rounded-4 lg:text-left border-dark-300 text-dark-1000">
          <h3 className="text-2xl leading-xl font-semibold lg:text-[32px] lg:leading-[38px]">
            {helpTitle}
          </h3>
          <p className="text-lg leading-[26px] font-normal">
            {helpDescription}
          </p>
          <section className="flex flex-col gap-3 lg:gap-4 first-letter">
            <HelpLink
              icon={<EmailIcon />}
              link={`mailto:${customerSupportEmail}`}
              text={t('emailSupport', 'Email Support')}
            />
            <HelpLink
              icon={<PhoneCall />}
              link={`tel:${customerSupportPhoneNumber}`}
              text={customerSupportPhoneNumber}
            />
          </section>
        </section>
      </section>
    );
  };

  return (
    <main>
      {isLoading ? (
        <section className="p-5">
          <Loader />
        </section>
      ) : (
        <section>
          <header>
            <ConfirmationHeader
              booking={booking}
              fromLookup={fromLookup}
              itemsAmount={itemsAmount}
            />
          </header>
          {booking && (
            <section className="lg:px-20 lg:py-12">
              <section className="w-full mx-auto lg:flex lg:flex-row lg:justify-center lg:gap-8 max-w-7xl">
                <section className="lg:flex lg:flex-col lg:gap-8">
                  {bookedItemsAmount > 0 && (
                    <ConfirmationBooked
                      booking={booking}
                      loading={loading}
                      setLoading={setLoading}
                      bookedAmount={bookedItemsAmount}
                      reload={reload}
                      setReload={setReload}
                    />
                  )}

                  {cancelledItemsAmount > 0 && (
                    <ConfirmationCancelled
                      booking={booking}
                      cancelledAmount={cancelledItemsAmount}
                    />
                  )}
                </section>
                <section className="lg:flex lg:flex-col lg:gap-8 lg:w-[405px]">
                  <ConfirmationPayment booking={booking} />
                  <ConfirmationFooter
                    booking={booking}
                    loading={loading}
                    setLoading={setLoading}
                    bookedAmount={bookedItemsAmount}
                    handleCancelBooking={handleCancelBooking}
                  />
                  <HelpSection />
                </section>
              </section>
            </section>
          )}
        </section>
      )}
    </main>
  );
};

export default Confirmation;
