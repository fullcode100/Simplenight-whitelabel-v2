import { Dispatch, SetStateAction } from 'react';
import { Item } from 'types/cart/CartType';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelRoomsInfo from './HotelRoomsInfo';

interface HotelItineraryBodyProps {
  item: Item;
  reload?: boolean;
  setReload?: Dispatch<SetStateAction<boolean>>;
}

const HotelItineraryBody = ({
  item,
  reload,
  setReload,
}: HotelItineraryBodyProps) => {
  return (
    <>
      <HotelGeneralInfo item={item.extended_data} />
      <HotelRoomsInfo
        item={item.extended_data}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
};

export default HotelItineraryBody;
