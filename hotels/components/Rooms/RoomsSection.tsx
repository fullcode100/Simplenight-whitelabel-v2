import { Room } from '../../types/response/SearchResponse';
import RoomSectionTitle from './components/RoomsSectionTitle';
import RoomsList from './components/RoomsList';

interface RoomsProps {
  rooms: Array<Room>;
  ref?: React.Ref<any>;
  hotelId: string;
  hotelName: string;
  nights?: number;
  guests?: number;
}

const RoomsSection = ({
  rooms,
  ref,
  hotelId,
  hotelName,
  nights = 0,
  guests = 0,
}: RoomsProps) => {
  return (
    <section className="mt-4 px-4" ref={ref}>
      <RoomSectionTitle />
      <RoomsList
        rooms={rooms}
        hotelId={hotelId}
        hotelName={hotelName}
        nights={nights}
        guests={guests}
      />
    </section>
  );
};

export default RoomsSection;
