import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import BreakdownSummary from 'components/global/PriceBreakdownModal/components/BreakdownSummary';
import RoomCardActions from './RoomCard/RoomCardActions';

interface RoomsProps {
  room: Room;
}

const RoomCard = ({ room }: RoomsProps) => {
  const { description: roomDescription, rates } = room;
  const { min_rate: minRate } = rates;
  const { rate } = minRate;

  return (
    <section className="shadow-container my-3 border border-dark-200 rounded">
      <RoomCardHeader roomDescription={roomDescription} rates={rate} />
      <Divider />
      <Divider />
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
