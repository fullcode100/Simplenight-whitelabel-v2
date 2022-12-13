import { Room } from 'cars/types/response/SearchResponse';
import RoomCard from './RoomCard';

interface RoomsProps {
  rooms: Array<Room>;
  carId: string;
  carName: string;
  nights: number;
  guests: number;
  roomsQty: number;
}

const RoomsList = ({
  rooms,
  carId,
  carName,
  nights,
  guests,
  roomsQty,
}: RoomsProps) => {
  return (
    <section className="mt-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:mt-3 lg:mb-12">
      {rooms.map((room) => {
        return (
          <RoomCard
            key={room.code}
            room={room}
            carId={carId}
            carName={carName}
            nights={nights}
            guests={guests}
            roomsQty={roomsQty}
          />
        );
      })}
    </section>
  );
};

export default RoomsList;
