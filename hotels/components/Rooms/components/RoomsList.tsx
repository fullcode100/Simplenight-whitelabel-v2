import { Room } from 'hotels/types/response/SearchResponse';
import RoomCard from './RoomCard';

interface RoomsProps {
  rooms: Array<Room>;
  hotelId: string;
  hotelName: string;
}

const RoomsList = ({ rooms, hotelId, hotelName }: RoomsProps) => {
  return (
    <section>
      {rooms.map((room) => {
        return (
          <RoomCard
            key={room.code}
            room={room}
            hotelId={hotelId}
            hotelName={hotelName}
          />
        );
      })}
    </section>
  );
};

export default RoomsList;
