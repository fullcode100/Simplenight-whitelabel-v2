import { Dispatch, SetStateAction } from 'react';
import CarGeneralInfo from './CarGeneralInfo';
import CarRoomInfo from './CarRoomInfo';
import { Item } from 'types/cart/CartType';

interface CarBreakdownBodyProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const CarBreakdownBody = ({
  item,
  reload,
  setReload,
}: CarBreakdownBodyProps) => {
  return (
    <section className="pl-[52px]">
      <CarGeneralInfo item={item} />
      <CarRoomInfo item={item} reload={reload} setReload={setReload} />
    </section>
  );
};

export default CarBreakdownBody;
