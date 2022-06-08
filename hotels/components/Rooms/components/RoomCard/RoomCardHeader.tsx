import {
  Rate,
  CancellationPolicy,
} from '../../../../types/response/SearchResponse';
import DetailItemCard from 'components/global/DetailItemCard/DetailItemCard';
import { Item } from '../../../../../types/cart/CartType';
import { useTranslation } from 'react-i18next';

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
  const [t] = useTranslation('hotels');
  const roomDetailsText = t('roomDetails', 'Room Details');
  return (
    <header className="p-4">
      <p className="text-lg font-semibold text-dark-1000 mb-2">
        {roomDescription}
      </p>
      <DetailItemCard
        label={roomDetailsText}
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
