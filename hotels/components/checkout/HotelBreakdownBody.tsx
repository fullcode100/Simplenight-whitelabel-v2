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
    <section className="pl-[52px]">
      <HotelGeneralInfo item={item?.extended_data} />
      <HotelRoomsInfo item={item} reload={reload} setReload={setReload} />
    </section>
  );
};

export default HotelBreakdownBody;
