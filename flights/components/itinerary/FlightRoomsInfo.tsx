import FlightRoomInfo from './FlightRoomInfo';
import { Item } from 'types/cart/CartType';

interface FlightRoomsInfoProps {
  item: Item;
}

const FlightRoomsInfo = ({ item }: FlightRoomsInfoProps) => {
  return <>{item && <FlightRoomInfo item={item} />}</>;
};

export default FlightRoomsInfo;
