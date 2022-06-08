import { NextPage } from 'next';

import ConfirmationFooter from 'components/confirmation/ConfirmationFooter/ConfirmationFooter';
import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import ConfirmationItemList from 'components/confirmation/ConfirmationItemList/ConfirmationItemList';
import { formatBooking } from 'helpers/bookingUtils';
import { bookingMock } from 'mocks/bookingMock';
import ConfirmationPayment from 'components/confirmation/ConfirmationPayment/ConfirmationPayment';

const Confirmation: NextPage = () => {
  const booking = formatBooking(bookingMock.booking);

  return (
    <main>
      <header>
        <ConfirmationHeader booking={booking} />
      </header>
      <section className="p-5">
        <ConfirmationItemList booking={booking} />
      </section>
      <ConfirmationPayment booking={booking} />
      <ConfirmationFooter booking={booking} />
    </main>
  );
};

export default Confirmation;
