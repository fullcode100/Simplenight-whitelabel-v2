/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dispatch, SetStateAction } from 'react';

import ConfirmationFooter from 'components/confirmation/ConfirmationFooter/ConfirmationFooter';
import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import ConfirmationPayment from 'components/confirmation/ConfirmationPayment/ConfirmationPayment';
import Loader from 'components/global/Loader/Loader';
import ConfirmationCancelled from 'components/confirmation/ConfirmationCancelled/ConfirmationCancelled';
import ConfirmationBooked from 'components/confirmation/ConfirmationBooked/ConfirmationBooked';

import HelpSection from 'components/confirmation/HelpSection/HelpSection';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationPageProps {
  booking?: Booking;
  isLoading: boolean;
  handleCancelBooking: () => void;
  fromLookup: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const ConfirmationPage = ({
  booking,
  isLoading,
  handleCancelBooking,
  fromLookup,
  loading,
  setLoading,
  reload,
  setReload,
}: ConfirmationPageProps) => {
  const flatBookingItems = booking?.items
    .map((item) => (item.item_data ? item : item))
    .flat();

  const bookedItemsAmount =
    flatBookingItems?.filter((item) => item.status == 'booked').length || 0;

  const cancelledItemsAmount =
    flatBookingItems?.filter((item) => item.status == 'cancelled').length || 0;

  const itemsAmount = bookedItemsAmount + cancelledItemsAmount;

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

export default ConfirmationPage;
