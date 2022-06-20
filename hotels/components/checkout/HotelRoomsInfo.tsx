import { Dispatch, SetStateAction } from 'react';
import HotelRoomInfo from './HotelRoomInfo';
import { HotelCart } from 'types/cart/CartType';

interface HotelRoomsInfoProps {
  item?: HotelCart;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelRoomsInfo = ({ item, reload, setReload }: HotelRoomsInfoProps) => {
  return (
    <>
      {item?.items?.map((room, index) => (
        <section key={index}>
          <HotelRoomInfo room={room} reload={reload} setReload={setReload} />
        </section>
      ))}
    </>
  );
};

export default HotelRoomsInfo;
