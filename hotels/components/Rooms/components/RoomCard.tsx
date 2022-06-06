import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import BreakdownSummary from 'components/global/PriceBreakdownModal/components/BreakdownSummary';
import RoomCardActions from './RoomCard/RoomCardActions';
import FreeCancellation from 'components/global/FreeCancellation/FreeCancellation';
import AmenitiesItem from '../../Amenities/components/AmenitiesItem';
import amenitiesIcons from 'hotels/components/Amenities/amenitiesIcons';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import PayAtProperty from 'components/global/PayAtProperty/PayAtProperty';

interface RoomsProps {
  room: Room;
  hotelId: string;
}

const cancellableType = 'FREE_CANCELLATION';

const RoomCard = ({ room, hotelId }: RoomsProps) => {
  const { description: roomDescription, rates, amenities } = room;
  const { min_rate: minRate } = rates;
  const { rate, cancellation_policy: cancellationPolicy } = minRate;
  const itemToBook = {
    inventory_id: hotelId,
    sn_booking_code: minRate.sn_booking_code,
  };

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const images = room?.photos?.map((photo) => photo.url) ?? [];
  return (
    <section className="shadow-container my-3 border border-dark-200 rounded">
      <ImageCarousel images={images} hotelName="" showDots={false} />
      <RoomCardHeader
        roomDescription={roomDescription}
        rates={rate}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
        itemToBook={itemToBook}
      />
      <Divider />
      <section className="p-4 flex flex-col gap-2">
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
      <section className="px-4 py-4">
        <FreeCancellation
          cancellable={cancellable}
          description={cancellationPolicy?.description}
          wfull
        />
        <PayAtProperty className="mt-3" />
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
