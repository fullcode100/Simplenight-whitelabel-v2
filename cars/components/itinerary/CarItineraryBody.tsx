import { Item } from 'types/cart/CartType';
import CarGeneralInfo from './CarGeneralInfo';
import CarRoomInfo from './CarRoomsInfo';

interface CarItineraryBodyProps {
  item: Item;
}

const CarItineraryBody = ({ item }: CarItineraryBodyProps) => {
  return (
    <>
      <CarGeneralInfo item={item} />
      <CarRoomInfo item={item} />
    </>
  );
};

export default CarItineraryBody;
