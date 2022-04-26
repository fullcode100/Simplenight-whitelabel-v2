import { Room } from '../../types/response/SearchResponse';
import RoomSectionTitle from './components/RoomsSectionTitle';
import RoomsList from './components/RoomsList';

interface RoomsProps {
  rooms: Array<Room>;
}

const RoomsSection = ({ rooms }: RoomsProps) => {
  return (
    <section className="mt-4 px-4">
      <RoomSectionTitle />
      <RoomsList rooms={rooms} />
    </section>
  );
};

export default RoomsSection;
