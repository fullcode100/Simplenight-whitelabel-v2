import CarRoomInfo from './CarRoomInfo';
import { Item } from 'types/cart/CartType';

interface CarRoomsInfoProps {
  item: Item;
}

const CarRoomsInfo = ({ item }: CarRoomsInfoProps) => {
  return <>{item && <CarRoomInfo item={item} />}</>;
};

export default CarRoomsInfo;
