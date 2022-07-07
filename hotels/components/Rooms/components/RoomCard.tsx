import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import BreakdownSummary from 'components/global/PriceBreakdownModal/components/BreakdownSummary';
import RoomCardActions from './RoomCard/RoomCardActions';
import AmenitiesItem from '../../Amenities/components/AmenitiesItem';
import amenitiesIcons from 'hotels/components/Amenities/amenitiesIcons';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import EmptyImage from 'components/global/EmptyImage/EmptyImage';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import { useState } from 'react';
import AmenitiesModal from 'hotels/components/Amenities/AmenitiesModal';
import { useTranslation } from 'react-i18next';

interface RoomsProps {
  room: Room;
  hotelId: string;
  hotelName: string;
  nights: number;
  guests: number;
}

const cancellableType = 'FREE_CANCELLATION';

const RoomCard = ({ room, hotelId, hotelName, nights, guests }: RoomsProps) => {
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
  const images = room?.photos?.map((photo) => photo.url) ?? [];

  const priceBreakdownText = t('priceBreakdown', 'Price Breakdown');
  const PriceBreakDown = () => (
    <button className="text-primary-1000 underline text-sm">
      {priceBreakdownText}
    </button>
  );
  return (
    <section className="shadow-container my-3 lg:my-0 border border-dark-200 rounded">
      {images.length > 0 ? (
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
        rates={rate}
        cancellationPolicy={cancellationPolicy}
        amenities={amenities}
        itemToBook={itemToBook}
        nights={nights}
        guests={guests}
      />
      <Divider />
      {amenities.length > 0 && (
        <>
          <section className="p-4 flex flex-col gap-2">
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
                className="text-sm leading-5 text-left font-medium text-primary-1000 hover:text-primary-500 focus:outline-none underline transition ease-in-out duration-150"
              >
                {viewAllAmenitiesText}
              </button>
            )}
          </section>
          <Divider />
        </>
      )}
      {cancellable && (
        <section className="px-4 py-4">
          {cancellable && (
            <FreeCancellationExtended
              policy={cancellationPolicy?.description}
            />
          )}
        </section>
      )}
      {cancellable && <Divider />}
      <section className="px-4 py-3">
        <BreakdownSummary
          rate={rate}
          CustomPriceBreakdown={<PriceBreakDown />}
          nights={nights}
          guests={guests}
        />
      </section>
      <Divider />
      <RoomCardActions room={room} hotelId={hotelId} />
    </section>
  );
};

export default RoomCard;
