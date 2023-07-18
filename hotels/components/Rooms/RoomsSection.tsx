import { Room } from '../../types/response/SearchResponse';
import RoomSectionTitle from './components/RoomsSectionTitle';
import RoomsList from './components/RoomsList';
import HotelSearchForm from '../search/HotelSearchForm';
import HotelBackButton from '../detail/HotelBackButton';

interface RoomsProps {
  rooms: Array<Room>;
  ref?: React.Ref<any>;
  hotelId: string;
  hotelName: string;
  nights?: number;
  guests?: number;
  roomsQty?: number;
  backLabel?: string;
}

const RoomsSection = ({
  rooms,
  ref,
  hotelId,
  hotelName,
  nights = 0,
  guests = 0,
  roomsQty = 0,
  backLabel = '',
}: RoomsProps) => {
  return (
    <section className="mt-6 px-4 lg:mt-12 lg:px-0" ref={ref}>
      <HotelBackButton backLabel={backLabel} />
      <RoomSectionTitle />
      <section className="hidden lg:block bg-dark-100 p-4 rounded-md my-8">
        <HotelSearchForm />
      </section>
      <RoomsList
        rooms={rooms}
        hotelId={hotelId}
        hotelName={hotelName}
        nights={nights}
        guests={guests}
        roomsQty={roomsQty}
      />
    </section>
  );
};

export default RoomsSection;
