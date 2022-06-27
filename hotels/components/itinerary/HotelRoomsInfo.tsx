import HotelRoomInfo from './HotelRoomInfo';
import { Item } from 'types/cart/CartType';

interface HotelRoomsInfoProps {
  item?: Item;
}

const HotelRoomsInfo = ({ item }: HotelRoomsInfoProps) => {
  return <>{item && <HotelRoomInfo room={item} />}</>;
};

export default HotelRoomsInfo;
