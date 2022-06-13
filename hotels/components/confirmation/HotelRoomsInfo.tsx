import { ItemExtraData } from 'types/booking/bookingType';
import HotelRoomInfo from './HotelRoomInfo';

interface HotelRoomsInfoProps {
  item?: ItemExtraData;
}

const HotelRoomsInfo = ({ item }: HotelRoomsInfoProps) => {
  return (
    <>
      {item?.items?.map((room, index) => (
        <section key={index}>
          <HotelRoomInfo room={room} />
        </section>
      ))}
    </>
  );
};

export default HotelRoomsInfo;
