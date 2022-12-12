import { Dispatch, SetStateAction } from 'react';
import CarRoomInfo from './CarRoomInfo';
import { Item } from 'types/cart/CartType';

interface CarRoomsInfoProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const CarRoomsInfo = ({ item, reload, setReload }: CarRoomsInfoProps) => {
  return (
    <>
      {item && (
        <CarRoomInfo item={item} reload={reload} setReload={setReload} />
      )}
    </>
  );
};

export default CarRoomsInfo;
