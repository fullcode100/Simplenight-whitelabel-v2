import { Dispatch, SetStateAction } from 'react';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelRoomsInfo from './HotelRoomsInfo';
import { Item } from 'types/cart/CartType';

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
      <HotelGeneralInfo item={item?.extended_data} />
      <HotelRoomsInfo item={item} reload={reload} setReload={setReload} />
    </section>
  );
};

export default HotelBreakdownBody;
