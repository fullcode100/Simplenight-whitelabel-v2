import { Dispatch, SetStateAction } from 'react';
import FlightRoomInfo from './FlightRoomInfo';
import { Item } from 'types/cart/CartType';

interface FlightRoomsInfoProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const FlightRoomsInfo = ({ item, reload, setReload }: FlightRoomsInfoProps) => {
  return (
    <>
      {item && (
        <FlightRoomInfo room={item} reload={reload} setReload={setReload} />
      )}
    </>
  );
};

export default FlightRoomsInfo;
