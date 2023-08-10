import {
  Rates,
  CancellationPolicy,
  Services,
} from '../../../../types/response/SearchResponse';
import DetailItemCard from './DetailItemCard/DetailItemCard';
import { Item } from '../../../../../types/cart/CartType';
import { useTranslation } from 'react-i18next';

interface RoomHeaderProps {
  roomDescription: string;
  rates: Rates;
  cancellationPolicy?: CancellationPolicy;
  amenities: string[];
  itemToBook: Item;
  nights: number;
  guests: number;
  services: Services;
  rooms?: number;
}

const RoomCardHeader = ({
  roomDescription,
  rates,
  cancellationPolicy,
  amenities,
  itemToBook,
  nights,
  guests,
  services,
  rooms,
}: RoomHeaderProps) => {
  const [t] = useTranslation('hotels');
  const roomDetailsText = t('roomDetails', 'Room Details');
  return (
    <header className="p-4">
      <p className="mb-2 text-lg font-semibold text-dark-1000">
        {roomDescription}
      </p>
    </header>
  );
};

export default RoomCardHeader;
