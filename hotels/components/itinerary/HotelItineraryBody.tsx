import { Dispatch, SetStateAction } from 'react';
import { Item } from 'types/cart/CartType';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelRoomsInfo from './HotelRoomsInfo';

interface HotelItineraryBodyProps {
  item: Item;
}

const HotelItineraryBody = ({ item }: HotelItineraryBodyProps) => {
  return (
    <>
      <HotelGeneralInfo item={item.extended_data} />
      <HotelRoomsInfo item={item} />
    </>
  );
};

export default HotelItineraryBody;
