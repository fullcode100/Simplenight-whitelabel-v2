import { Room } from 'hotels/types/response/SearchResponse';
import RoomCard from './RoomCard';

interface RoomsProps {
  rooms: Array<Room>;
  hotelId: string;
  hotelName: string;
  nights: number;
  guests: number;
}

const RoomsList = ({
  rooms,
  hotelId,
  hotelName,
  nights,
  guests,
}: RoomsProps) => {
  return (
    <section>
      {rooms.map((room) => {
        return (
          <RoomCard
            key={room.code}
            room={room}
            hotelId={hotelId}
            hotelName={hotelName}
            nights={nights}
            guests={guests}
          />
        );
      })}
    </section>
  );
};

export default RoomsList;
