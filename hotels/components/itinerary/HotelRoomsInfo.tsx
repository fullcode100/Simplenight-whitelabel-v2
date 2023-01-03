import HotelRoomInfo from './HotelRoomInfo';
import { Item } from '../../types/response/CartHotels';

interface HotelRoomsInfoProps {
  item?: Item;
}

const HotelRoomsInfo = ({ item }: HotelRoomsInfoProps) => {
  return <>{item && <HotelRoomInfo room={item} />}</>;
};

export default HotelRoomsInfo;
