import { Room } from '../../types/response/SearchResponse';
import RoomSectionTitle from './components/RoomsSectionTitle';
import RoomsList from './components/RoomsList';
import FlightRoomAvailabilityForm from '../search/FlightRoomAvailabilityForm';

interface RoomsProps {
  rooms: Array<Room>;
  ref?: React.Ref<any>;
  flightId: string;
  flightName: string;
  nights?: number;
  guests?: number;
}

const RoomsSection = ({
  rooms,
  ref,
  flightId,
  flightName,
  nights = 0,
  guests = 0,
}: RoomsProps) => {
  return (
    <section className="mt-6 px-4 lg:mt-12 lg:px-0" ref={ref}>
      <RoomSectionTitle />
      <section className="hidden lg:block bg-dark-100 p-4 rounded-md my-8">
        <FlightRoomAvailabilityForm />
      </section>
      <RoomsList
        rooms={rooms}
        flightId={flightId}
        flightName={flightName}
        nights={nights}
        guests={guests}
      />
    </section>
  );
};

export default RoomsSection;
