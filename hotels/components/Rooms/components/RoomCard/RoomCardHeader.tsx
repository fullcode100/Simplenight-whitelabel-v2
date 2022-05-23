import {
  Rate,
  CancellationPolicy,
} from '../../../../types/response/SearchResponse';
import DetailItemCard from 'components/global/DetailItemCard/DetailItemCard';
import { Item } from '../../../../../types/cart/CartType';

interface RoomHeaderProps {
  roomDescription: string;
  rates: Rate;
  cancellationPolicy?: CancellationPolicy;
  amenities: string[];
  itemToBook: Item;
}

const RoomCardHeader = ({
  roomDescription,
  rates,
  cancellationPolicy,
  amenities,
  itemToBook,
}: RoomHeaderProps) => {
  return (
    <header className="p-4">
      <p className="text-lg font-semibold text-dark-1000 mb-2">
        {roomDescription}
      </p>
      <DetailItemCard
        label="Room Details"
        description={roomDescription}
        rates={rates}
        cancellationPolicy={cancellationPolicy}
        features={amenities}
        itemToBook={itemToBook}
      />
    </header>
  );
};

export default RoomCardHeader;
