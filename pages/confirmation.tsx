import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import { formatBooking } from 'helpers/bookingUtils';
import { bookingMock } from 'mocks/bookingMock';
import { NextPage } from 'next';

const Confirmation: NextPage = () => {
  const { booking } = bookingMock;
  const formattedBooking = formatBooking(booking);

  return (
    <main>
      <header>
        <ConfirmationHeader booking={booking} />
      </header>
      <section></section>
      <section></section>
    </main>
  );
};

export default Confirmation;
