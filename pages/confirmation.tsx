import { NextPage } from 'next';

import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import ConfirmationItemList from 'components/confirmation/ConfirmationItemList/ConfirmationItemList';
import { formatBooking } from 'helpers/bookingUtils';
import { bookingMock } from 'mocks/bookingMock';

const Confirmation: NextPage = () => {
  const booking = formatBooking(bookingMock.booking);

  console.log(booking);
  return (
    <main>
      <header>
        <ConfirmationHeader booking={booking} />
      </header>
      <section className="p-5">
        <ConfirmationItemList booking={booking} />
      </section>
      <section></section>
    </main>
  );
};

export default Confirmation;
