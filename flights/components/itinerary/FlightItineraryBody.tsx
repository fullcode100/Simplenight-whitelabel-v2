import { Item } from 'types/cart/CartType';
import FlightGeneralInfo from './FlightGeneralInfo';
import FlightRoomInfo from './FlightRoomsInfo';

interface FlightItineraryBodyProps {
  item: Item;
}

const FlightItineraryBody = ({ item }: FlightItineraryBodyProps) => {
  return (
    <>
      <FlightGeneralInfo item={item} />
      <FlightRoomInfo item={item} />
    </>
  );
};

export default FlightItineraryBody;
