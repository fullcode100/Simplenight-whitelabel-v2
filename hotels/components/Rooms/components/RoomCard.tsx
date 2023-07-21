import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import RoomCardActions from './RoomCard/RoomCardActions';
import AmenitiesItem from '../../Amenities/components/AmenitiesItem';
import amenitiesIcons from 'hotels/components/Amenities/amenitiesIcons';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import { useState } from 'react';
import AmenitiesModal from 'hotels/components/Amenities/AmenitiesModal';
import { useTranslation } from 'react-i18next';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';

interface RoomsProps {
  room: Room;
  hotelId: string;
  hotelName: string;
  nights: number;
  guests: number;
  roomsQty: number;
}

const cancellableType = 'FREE_CANCELLATION';
const nonRefundableType = 'NON_REFUNDABLE';
const FALLBACK_HOTEL_RESULT = '/images/hotels/fallbackRoomDetail.jpg';

const RoomCard = ({
  room,
  hotelId,
  hotelName,
  nights,
  guests,
  roomsQty,
}: RoomsProps) => {
  const [t] = useTranslation('hotels');
  const [tg] = useTranslation('global');

  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const { name: roomName, rates, amenities } = room;
  const { min_rate: minRate } = rates;
  const { rate, cancellation_policy: cancellationPolicy } = minRate;
  const itemToBook = {
    sn_booking_code: minRate.sn_booking_code,
  };

  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const nonRefundable =
    cancellationPolicy?.cancellation_type === nonRefundableType;

  const tRoom = tg('room', 'Room');
  const tRooms = tg('rooms', 'Rooms');
  const ROOM_TEXT = usePlural(roomsQty, tRoom, tRooms);
  const tNight = tg('night', 'Night');
  const tNights = tg('nights', 'Nights');

  const NIGHT_TEXT = usePlural(nights, tNight, tNights);

  const FallbackImage = () => (
    <section
      className="min-w-[45%] min-h-[300px] block"
      style={{
        backgroundImage: `url(${FALLBACK_HOTEL_RESULT})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );

  const Amenities = () => {
    let availableIconCounter = 0;
    return (
      <section>
        {amenities?.length > 0 && (
          <>
            <section className="flex flex-col gap-2 p-4">
              {amenities.map((amenity) => {
                const icon = amenitiesIcons.find((amenityOption) => {
                  return amenityOption.options.some(
                    (amenityKeyword) =>
                      amenityKeyword.toLowerCase().trim() ==
                      amenity.toLowerCase().trim(),
                  );
                });
                const amenityIcon = icon ? icon : null;
                if (amenityIcon) {
                  availableIconCounter += 1;
                  if (availableIconCounter <= 3) {
                    return (
                      <AmenitiesItem
                        key={amenity}
                        view="list"
                        text={amenity}
                        icon={amenityIcon && amenityIcon.iconSmall}
                      />
                    );
                  }
                }
              })}
              <AmenitiesModal
                showAmenitiesModal={showAmenitiesModal}
                onClose={() => setShowAmenitiesModal(false)}
                amenities={amenities}
              />
            </section>
          </>
        )}
      </section>
    );
  };

  const Price = () => (
    <section className="flex-col justify-end w-full py-4 pr-4">
      <section className="text-right">
        <PriceDisplay
          rate={rates}
          isStartingTotal={true}
          isPriceBase
          isAvgAmount
        />
      </section>
    </section>
  );

  return (
    <section className="flex flex-col justify-between mx-0 lg:mx-3 my-3 overflow-hidden border rounded lg:flex-row shadow-container lg:my-0 border-dark-200">
      <section className="lg:h-[300px] w-[100%] lg:min-h-[15rem] lg:min-w-[35%] ">
        {room?.photos && room.photos.length > 0 ? (
          <ImageCarousel
            images={room?.photos}
            title={roomName}
            showDots={true}
            showIndexDot={false}
            height="270px"
          />
        ) : (
          <FallbackImage />
        )}
      </section>
      <section className="flex flex-col justify-between lg:justify-start w-[100%] lg:min-w-[65%]">
        <section className="flex flex-col w-full lg:flex-row">
          <section className="md:w-[100%] sm:w-[100%] lg:w-[50%] ">
            <RoomCardHeader
              roomDescription={roomName}
              rates={rates}
              cancellationPolicy={cancellationPolicy}
              amenities={amenities}
              itemToBook={itemToBook}
              nights={nights}
              guests={guests}
              services={room.services}
              rooms={roomsQty}
            />
            <Divider className="block lg:hidden" />
            <Amenities />
          </section>
          <section className="lg:flex lg:justify-between lg:flex-col md:w-[100%] sm:w-[100%] lg:w-[50%]">
            <section className="flex items-center justify-start px-4 pb-4 lg:pt-4 lg:justify-end">
              {cancellable && (
                <FreeCancellationExtended
                  title={false}
                  showPolicyLabel={false}
                  policy={cancellationPolicy?.description}
                />
              )}
              <NonRefundable
                title={false}
                description={cancellationPolicy?.description}
                nonCancellable={nonRefundable}
              />
            </section>
            <section className="hidden lg:block">
              <Price />
            </section>
          </section>
        </section>
        <Divider />
        <section className="flex flex-col lg:flex-row w-full items-center h-[100%]">
          <section className="flex justify-between w-[100%] lg:w-[50%] items-center ">
            <section className="p-4">{`${roomsQty} ${ROOM_TEXT}, ${nights} ${NIGHT_TEXT}`}</section>
            <section className="block  lg:hidden">
              <Price />
            </section>
          </section>
          <section className="w-[100%] lg:w-[50%] items-center ">
            <Divider className="block lg:hidden" />
            <RoomCardActions
              name={hotelName}
              room={room}
              hotelId={hotelId}
              rooms={roomsQty}
            />
          </section>
        </section>
      </section>
    </section>
  );
};

export default RoomCard;
