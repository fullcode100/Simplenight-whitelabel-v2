import { Rate } from '../../../../types/response/SearchResponse';
import DetailItemCard from 'components/global/DetailItemCard/DetailItemCard';

interface RoomHeaderProps {
  roomDescription: string;
  rates: Rate;
}

const RoomCardHeader = ({ roomDescription, rates }: RoomHeaderProps) => {
  return (
    <header className="p-4">
      <p className="text-lg font-semibold text-dark-1000 mb-2">
        {roomDescription}
      </p>
      <DetailItemCard
        label="Room Details"
        description={roomDescription}
        rates={rates}
      />
    </header>
  );
};

export default RoomCardHeader;
