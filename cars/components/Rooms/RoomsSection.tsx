import { Room } from '../../types/response/SearchResponse';
import RoomSectionTitle from './components/RoomsSectionTitle';
import RoomsList from './components/RoomsList';
import CarRoomAvailabilityForm from '../search/CarRoomAvailabilityForm';

interface RoomsProps {
  rooms: Array<Room>;
  ref?: React.Ref<any>;
  carId: string;
  carName: string;
  nights?: number;
  guests?: number;
  roomsQty?: number;
}

const RoomsSection = ({
  rooms,
  ref,
  carId,
  carName,
  nights = 0,
  guests = 0,
  roomsQty = 0,
}: RoomsProps) => {
  return (
    <section className="mt-6 px-4 lg:mt-12 lg:px-0" ref={ref}>
      <RoomSectionTitle />
      <section className="hidden lg:block bg-dark-100 p-4 rounded-md my-8">
        <CarRoomAvailabilityForm />
      </section>
      <RoomsList
        rooms={rooms}
        carId={carId}
        carName={carName}
        nights={nights}
        guests={guests}
        roomsQty={roomsQty}
      />
    </section>
  );
};

export default RoomsSection;
