import ConfirmationHeader from 'components/confirmation/ConfirmationHeader/ConfirmationHeader';
import { bookingMock } from 'mocks/bookingMock';
import { NextPage } from 'next';

const Confirmation: NextPage = () => {
  const { booking } = bookingMock;

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
