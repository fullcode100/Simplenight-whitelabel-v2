import { Dispatch, SetStateAction } from 'react';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelRoomsInfo from './HotelRoomsInfo';
import { Item } from 'types/cart/CartType';

interface HotelBreakdownBodyProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelBreakdownBody = ({
  item,
  reload,
  setReload,
}: HotelBreakdownBodyProps) => {
  return (
    <>
      <HotelGeneralInfo item={item?.extended_data} />
      <HotelRoomsInfo item={item} reload={reload} setReload={setReload} />
    </>
  );
};

export default HotelBreakdownBody;
