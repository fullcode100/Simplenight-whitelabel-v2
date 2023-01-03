import { Item } from '../../types/response/CartHotels';
import HotelGeneralInfo from './HotelGeneralInfo';
import HotelRoomsInfo from './HotelRoomsInfo';

interface HotelItineraryBodyProps {
  item: Item;
}

const HotelItineraryBody = ({ item }: HotelItineraryBodyProps) => {
  return (
    <>
      <HotelGeneralInfo item={item} />
      <HotelRoomsInfo item={item} />
    </>
  );
};

export default HotelItineraryBody;
