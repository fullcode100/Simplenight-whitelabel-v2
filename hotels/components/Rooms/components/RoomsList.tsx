import { Room } from 'hotels/types/response/SearchResponse';
import RoomCard from './RoomCard';

interface RoomsProps {
  rooms: Array<Room>;
}

const RoomsList = ({ rooms }: RoomsProps) => {
  return (
    <section>
      {rooms.map((room) => {
        return <RoomCard key={room.code} room={room} />;
      })}
    </section>
  );
};

export default RoomsList;
