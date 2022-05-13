import { Room } from 'hotels/types/response/SearchResponse';
import RoomCard from './RoomCard';

interface RoomsProps {
  rooms: Array<Room>;
  hotelId: string;
}

const RoomsList = ({ rooms, hotelId }: RoomsProps) => {
  return (
    <section>
      {rooms.map((room) => {
        return <RoomCard key={room.code} room={room} hotelId={hotelId} />;
      })}
    </section>
  );
};

export default RoomsList;
