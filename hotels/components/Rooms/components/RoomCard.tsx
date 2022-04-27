import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import BreakdownSummary from 'components/global/PriceBreakdownModal/components/BreakdownSummary';
import RoomCardActions from './RoomCard/RoomCardActions';
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
interface RoomsProps {
  room: Room;
}

const cancellableType = 'FREE_CANCELLATION';

const RoomCard = ({ room }: RoomsProps) => {
  const { description: roomDescription, rates } = room;
  const { min_rate: minRate } = rates;
  const { rate, cancellation_policy: cancellationPolicy } = minRate;

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;

  return (
    <section className="shadow-container my-3 border border-dark-200 rounded">
      <RoomCardHeader
        roomDescription={roomDescription}
        rates={rate}
        cancellationPolicy={cancellationPolicy}
      />
      <Divider />
      <section className="flex gap-2 px-4 py-3">
        <FreeCancellation cancellable={cancellable} />
      </section>
      <Divider />
      <section className="px-4 py-3">
        <BreakdownSummary rate={rate} />
      </section>
      <Divider />
      <RoomCardActions />
    </section>
  );
};

export default RoomCard;
