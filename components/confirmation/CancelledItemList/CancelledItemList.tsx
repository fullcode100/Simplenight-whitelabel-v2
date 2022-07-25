import CancelledItem from '../CancelledItem/CancelledItem';
import { Booking } from 'types/booking/bookingType';

interface CancelledItemListProps {
  booking: Booking;
}

const CancelledItemList = ({ booking }: CancelledItemListProps) => {
  const primaryContact = booking.primary_contact;

  return (
    <section className="grid gap-3">
      {booking.items.map((item, index) => {
        const isCancelled = item.status == 'cancelled';
        if (!isCancelled) return null;
        return (
          <section key={index}>
            <CancelledItem item={item} primaryContact={primaryContact} />
          </section>
        );
      })}
    </section>
  );
};

export default CancelledItemList;
