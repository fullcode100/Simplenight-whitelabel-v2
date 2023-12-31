import {
  Rate,
  CancellationPolicy,
} from '../../../../types/response/SearchResponse';
import DetailItemCard from './DetailItemCard/DetailItemCard';
import { Item } from '../../../../../types/cart/CartType';
import { useTranslation } from 'react-i18next';

interface RoomHeaderProps {
  roomDescription: string;
  rates: Rate;
  cancellationPolicy?: CancellationPolicy;
  amenities: string[];
  itemToBook: Item;
  nights: number;
  guests: number;
}

const RoomCardHeader = ({
  roomDescription,
  rates,
  cancellationPolicy,
  amenities,
  itemToBook,
  nights,
  guests,
}: RoomHeaderProps) => {
  const [t] = useTranslation('flights');
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
        nights={nights}
        guests={guests}
      />
    </header>
  );
};

export default RoomCardHeader;
