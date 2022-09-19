import { Dispatch, SetStateAction } from 'react';
import FlightGeneralInfo from './FlightGeneralInfo';
import FlightRoomsInfo from './FlightRoomsInfo';
import { Item } from 'types/cart/CartType';

interface FlightBreakdownBodyProps {
  item?: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const FlightBreakdownBody = ({
  item,
  reload,
  setReload,
}: FlightBreakdownBodyProps) => {
  return (
    <section className="pl-[52px]">
      <FlightGeneralInfo item={item?.extended_data} />
      <FlightRoomsInfo item={item} reload={reload} setReload={setReload} />
    </section>
  );
};

export default FlightBreakdownBody;
