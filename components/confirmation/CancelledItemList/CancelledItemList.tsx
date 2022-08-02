import CancelledItem from '../CancelledItem/CancelledItem';
import { Booking } from 'types/booking/bookingType';

interface CancelledItemListProps {
  booking: Booking;
}

const CancelledItemList = ({ booking }: CancelledItemListProps) => {
  return (
    <section className="grid lg:gap-6 lg:p-6">
      {booking.items.map((item, index) => {
        const isCancelled = item.status == 'cancelled';
        if (!isCancelled) return null;
        return (
          <section key={index}>
            <CancelledItem item={item} />
          </section>
        );
      })}
    </section>
  );
};

export default CancelledItemList;
