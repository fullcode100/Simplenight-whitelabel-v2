import { Room } from 'flights/types/response/SearchResponse';
import RoomCard from './RoomCard';

interface RoomsProps {
  rooms: Array<Room>;
  flightId: string;
  flightName: string;
  nights: number;
  guests: number;
}

const RoomsList = ({
  rooms,
  flightId,
  flightName,
  nights,
  guests,
}: RoomsProps) => {
  return (
    <section className="mt-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-3 lg:mb-12">
      {rooms.map((room) => {
        return (
          <RoomCard
            key={room.code}
            room={room}
            flightId={flightId}
            flightName={flightName}
            nights={nights}
            guests={guests}
          />
        );
      })}
    </section>
  );
};

export default RoomsList;
