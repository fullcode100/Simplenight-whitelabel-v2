import ConfirmationItem from '../ConfirmationItem/ConfirmationItem';
import { Booking } from 'types/booking/bookingType';

interface ConfirmationItemListProps {
  booking: Booking;
}

const ConfirmationItemList = ({ booking }: ConfirmationItemListProps) => {
  return (
    <section className="grid gap-3">
      {booking.items.map((item, index) => (
        <section key={index}>
          <ConfirmationItem item={item} />
        </section>
      ))}
    </section>
  );
};

export default ConfirmationItemList;
