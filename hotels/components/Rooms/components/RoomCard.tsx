import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import BreakdownSummary from 'hotels/components/PriceBreakdownModal/components/BreakdownSummary';
import RoomCardActions from './RoomCard/RoomCardActions';
import AmenitiesItem from '../../Amenities/components/AmenitiesItem';
import amenitiesIcons from 'hotels/components/Amenities/amenitiesIcons';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import EmptyImage from 'components/global/EmptyImage/EmptyImage';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import BedsAmount from 'hotels/components/BedsAmount/BedsAmount';
import { useState } from 'react';
import AmenitiesModal from 'hotels/components/Amenities/AmenitiesModal';
import { useTranslation } from 'react-i18next';
import RoomPriceBreakdownModal from 'hotels/components/PriceBreakdownModal/RoomPriceBreakdownModal';
import useModal from 'hooks/layoutAndUITooling/useModal';
import PartialRefund from 'components/global/PartialRefund/PartialRefund';

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
const partialRefund = 'PARTIAL_REFUND';

const RoomCard = ({
  room,
  hotelId,
  hotelName,
  nights,
  guests,
  roomsQty,
}: RoomsProps) => {
  const [t] = useTranslation('hotels');
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const { name: roomName, rates, amenities } = room;
  const { min_rate: minRate } = rates;
  const { rate, cancellation_policy: cancellationPolicy } = minRate;
  const itemToBook = {
    sn_booking_code: minRate.sn_booking_code,
  };
  const viewAllAmenitiesText = t('viewAllAmenities', 'View all amenities');
  const cancellable = cancellationPolicy?.cancellation_type === cancellableType;
  const nonRefundable =
    cancellationPolicy?.cancellation_type === nonRefundableType;
  const partialRefundable =
    cancellationPolicy?.cancellation_type === partialRefund;

  const images = room?.photos?.map((photo) => photo.url) ?? [];
  const [isOpen, onOpen, onClose] = useModal();

  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const PriceBreakDown = () => (
    <>
      <RoomPriceBreakdownModal
        isOpen={isOpen}
        onClose={onClose}
        rate={rates}
        nights={nights}
        roomsQty={roomsQty}
      />
      <button onClick={onOpen} className="text-sm underline text-primary-1000">
        {priceBreakdownText}
      </button>
    </>
  );

  return (
    <section className="my-3 border rounded overflow-hidden shadow-container lg:my-0 border-dark-200">
      {images?.length > 0 ? (
        <ImageCarousel
          images={images}
          title={roomName}
          showDots={true}
          showIndexDot={false}
        />
      ) : (
        <EmptyImage />
      )}
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
      <Divider />
      {amenities?.length > 0 && (
        <>
          <section className="flex flex-col gap-2 p-4">
            {amenities.map((amenity, index) => {
              const amenityIcon = amenitiesIcons.find((amenityOption) => {
                amenityOption.options.includes(amenity);
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
            <AmenitiesModal
              showAmenitiesModal={showAmenitiesModal}
              onClose={() => setShowAmenitiesModal(false)}
              amenities={amenities}
            />
            {amenities.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAmenitiesModal(true)}
                className="text-sm font-semibold leading-5 text-left underline transition duration-150 ease-in-out text-primary-1000 hover:text-primary-500 focus:outline-none"
              >
                {viewAllAmenitiesText}
              </button>
            )}
          </section>
          <Divider />
        </>
      )}
      <Divider />
      <section className="px-4 py-4">
        {cancellable && (
          <FreeCancellationExtended policy={cancellationPolicy?.description} />
        )}
        <NonRefundable
          nonCancellable={nonRefundable}
          description={cancellationPolicy?.description}
        />
        <PartialRefund
          nonCancellable={partialRefundable}
          description={cancellationPolicy?.description}
        />
      </section>
      {(cancellable || nonRefundable || partialRefundable) && <Divider />}
      <section className="px-4 py-3">
        <BreakdownSummary
          rate={rates}
          CustomPriceBreakdown={<PriceBreakDown />}
          nights={nights}
          guests={guests}
          roomsQty={roomsQty}
          isPriceBase
          isAvgAmount
        />
      </section>
      <Divider />
      <RoomCardActions room={room} hotelId={hotelId} rooms={roomsQty} />
    </section>
  );
};

export default RoomCard;
