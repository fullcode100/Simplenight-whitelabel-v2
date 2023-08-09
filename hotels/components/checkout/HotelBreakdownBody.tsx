import { Dispatch, SetStateAction } from 'react';
import HotelRoomsInfo from './HotelRoomsInfo';
// import { Item } from 'types/cart/CartType';
import { Item } from '../../types/response/CartHotels';

interface HotelBreakdownBodyProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
  useCollapse?: boolean;
}

const HotelBreakdownBody = ({
  item,
  reload,
  setReload,
  useCollapse = true,
}: HotelBreakdownBodyProps) => {
  return (
    <section className={`${useCollapse && 'pl-[52px]'}`}>
      <HotelRoomsInfo item={item} reload={reload} setReload={setReload} />
    </section>
  );
};

export default HotelBreakdownBody;
