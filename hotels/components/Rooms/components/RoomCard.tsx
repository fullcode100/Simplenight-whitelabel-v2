import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import BreakdownSummary from 'components/global/PriceBreakdownModal/components/BreakdownSummary';
import RoomCardActions from './RoomCard/RoomCardActions';
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import AmenitiesItem from '../../Amenities/components/AmenitiesItem';
import amenitiesIcons from 'hotels/components/Amenities/amenitiesIcons';

interface RoomsProps {
  room: Room;
  hotelId: string;
}

const cancellableType = 'FREE_CANCELLATION';

const RoomCard = ({ room, hotelId }: RoomsProps) => {
  const { description: roomDescription, rates, amenities } = room;
  const { min_rate: minRate } = rates;
  const { rate, cancellation_policy: cancellationPolicy } = minRate;

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;

  return (
    <section className="shadow-container my-3 border border-dark-200 rounded">
      <RoomCardHeader
        roomDescription={roomDescription}
        rates={rate}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
      />
      <Divider />
      <section className="p-4 grid grid-cols-2 gap-4">
        {amenities.map((amenity, index) => {
          const amenityIcon = amenitiesIcons.find((amenityOption) => {
            if (amenityOption.options.includes(amenity)) {
              return true;
            }
            return false;
          });

          if (index <= 2) {
            return (
              <AmenitiesItem
                key={amenity}
                view="list"
                text={amenity}
                icon={amenityIcon && amenityIcon.iconSmall}
              />
            );
          }
        })}
      </section>
      <Divider />
      <section className="flex gap-2 px-4 py-3">
        <FreeCancellation cancellable={cancellable} />
      </section>
      <Divider />
      <section className="px-4 py-3">
        <BreakdownSummary rate={rate} />
      </section>
      <Divider />
      <RoomCardActions room={room} hotelId={hotelId} />
    </section>
  );
};

export default RoomCard;
