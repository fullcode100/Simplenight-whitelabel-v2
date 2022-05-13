import { Room } from '../../types/response/SearchResponse';
import RoomSectionTitle from './components/RoomsSectionTitle';
import RoomsList from './components/RoomsList';

interface RoomsProps {
  rooms: Array<Room>;
  ref?: React.Ref<any>;
  hotelId: string;
}

const RoomsSection = ({ rooms, ref, hotelId }: RoomsProps) => {
  return (
    <section className="mt-4 px-4" ref={ref}>
      <RoomSectionTitle />
      <RoomsList rooms={rooms} hotelId={hotelId} />
    </section>
  );
};

export default RoomsSection;
