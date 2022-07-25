import { Dispatch, SetStateAction } from 'react';
import HotelRoomInfo from './HotelRoomInfo';
import { Item } from 'types/cart/CartType';

interface HotelRoomsInfoProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelRoomsInfo = ({ item, reload, setReload }: HotelRoomsInfoProps) => {
  return (
    <>
      {item && (
        <HotelRoomInfo room={item} reload={reload} setReload={setReload} />
      )}
    </>
  );
};

export default HotelRoomsInfo;
