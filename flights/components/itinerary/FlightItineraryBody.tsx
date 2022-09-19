import { Item } from 'types/cart/CartType';
import FlightGeneralInfo from './FlightGeneralInfo';
import FlightRoomsInfo from './FlightRoomsInfo';

interface FlightItineraryBodyProps {
  item: Item;
}

const FlightItineraryBody = ({ item }: FlightItineraryBodyProps) => {
  return (
    <>
      <FlightGeneralInfo item={item.extended_data} />
      <FlightRoomsInfo item={item} />
    </>
  );
};

export default FlightItineraryBody;
