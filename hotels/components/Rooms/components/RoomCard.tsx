import { Room } from 'hotels/types/response/SearchResponse';
import RoomCardHeader from './RoomCard/RoomCardHeader';
import Divider from 'components/global/Divider/Divider';
import RoomCardActions from './RoomCard/RoomCardActions';
import AmenitiesItem from '../../Amenities/components/AmenitiesItem';
import amenitiesIcons from 'hotels/components/Amenities/amenitiesIcons';
import ImageCarousel from 'components/global/CarouselNew/ImageCarousel';
import FreeCancellationExtended from 'components/global/FreeCancellation/FreeCancellationExtended';
import NonRefundable from 'components/global/NonRefundable/NonRefundable';
import { useEffect, useState } from 'react';
import AmenitiesModal from 'hotels/components/Amenities/AmenitiesModal';
import { useTranslation } from 'react-i18next';
import { usePlural } from 'hooks/stringBehavior/usePlural';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import AmenitiesDefaultIcon from 'public/icons/assets/amenities/default.svg';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import BreakdownSubtitle from 'hotels/components/PriceBreakdownModal/components/BreakdownSubtitle';

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
const RESORT_FEES = 'RESORT_FEES';

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
  const payAtPropertyLabel = t('payAtProperty', 'Pay at property');
  const additionalFeesLabel = t('additionalFees', 'Additional Fees');
  const payNowLabelLabel = t('payNow');
  const basePriceLabel = t('basePrice');
  const roomAmenitiesLabel = t('roomAmenities');
  const priceBreakdownLabel = t('priceBreakdown');
  const featuresLabel = t('features');
  const termsOfServiceLabel = tg('termsOfService');
  const supplierLabel = tg('supplier');

  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showLocalCurrency, setShowLocalCurrency] = useState(false);
  const [open, setOpen] = useState(false);
  const { name: roomName, rates, amenities, description, features } = room;
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
  const approxLabel = t('approx', 'Approx');
  const resortFeeLabel = t('resortFee', 'Resort Fees');

  const NIGHT_TEXT = usePlural(nights, tNight, tNights);

  const AmenityDefaultIcon = {
    iconLarge: <AmenitiesDefaultIcon className="w-12 h-12 mx-auto" />,
    iconSmall: <AmenitiesDefaultIcon />,
  };

  useEffect(() => {
    const {
      rates: {
        min_rate: { rate },
      },
    } = room;
    if (rate.rate_breakdown.post_paid_rate?.taxes?.length) {
      setShowLocalCurrency(
        rate.rate_breakdown.post_paid_rate?.taxes[0]?.tax_amount.currency !=
          rate.rate_breakdown.post_paid_rate?.taxes[0]?.tax_original_amount
            ?.currency,
      );
    }
  }, [room]);

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

  const RoomAmenities = () => {
    return (
      <section>
        {amenities?.length > 0 && (
          <>
            <section className="grid gap-4 md:grid-cols-4 md:grid-rows-4 grid-cols-1 grid-rows-1 p-4">
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

  const RenderChooseFeatures = () => {
    return (
      <section className="w-full flex-col justify-between">
        <section className="w-full flex justify-between space-x-2 p-3">
          <section className="flex flex-col w-full  space-y-2">
            {features?.map((feature) => (
              <section className="text-dark-1000 ml-2 text-xs md:text-base">
                {feature}
              </section>
            ))}
          </section>
        </section>
      </section>
    );
  };

  const RenderPriceBreakDown = () => {
    const {
      rates: {
        min_rate: { rate, cancellation_policy },
      },
    } = room;
    const resortFees = rate.rate_breakdown.post_paid_rate?.taxes.find(
      (tax) => tax.description === RESORT_FEES,
    );
    const resortFeesFormatted = resortFees?.tax_amount.formatted ?? '$0.00';
    return (
      <section className="w-full flex-col justify-between">
        <section className="w-full flex justify-between space-x-2 p-3">
          <section className="flex flex-col space-y-2">
            <section className="text-dark-1000 text-xs md:text-base">
              {tRoom}
            </section>
            <section className="text-dark-1000 text-xs md:text-base">
              {basePriceLabel}
            </section>
            <section className="text-dark-1000 text-xs md:text-base">
              {rate.rate_breakdown.taxes?.length
                ? rate.rate_breakdown.taxes[0].description
                : ''}
            </section>
          </section>

          <section className="flex flex-col space-y-2">
            <section className="p-3"></section>
            <section className="text-dark-1000 text-xs md:text-base">
              {rate.rate_breakdown.total_base_amount.formatted}
            </section>
            <section className="text-dark-1000 text-xs md:text-base text-right">
              {rate.rate_breakdown.taxes?.length
                ? rate.rate_breakdown.taxes[0].tax_amount.formatted
                : ''}
            </section>
          </section>
        </section>
        <Divider className="mt-3 mb-4" />
        <section className="w-full flex justify-between space-x-2 p-3">
          <section className="flex flex-col space-y-2">
            <section className="text-dark-1000 text-xs md:text-base">
              {payNowLabelLabel}
            </section>
            <section className="pb-2 pt-4">
              <BreakdownSubtitle
                className="text-xs md:text-base font-semibold text-dark-800"
                value={additionalFeesLabel}
              />
            </section>
            <section className="flex flex-col space-y-1">
              <section className="text-dark-1000 text-xs md:text-base">
                {resortFeeLabel}
              </section>
            </section>
          </section>

          <section className="flex flex-col space-y-2">
            <section className="font-bold text-right text-dark-1000 text-xs md:text-base">
              {rate.total_amount.formatted}
            </section>
            <section className="pb-2 pt-4 text-dark-1000 text-xs md:text-base">
              {rate.rate_breakdown.post_paid_rate?.taxes.length
                ? rate.rate_breakdown.post_paid_rate?.taxes.map(
                    (tax, index) => {
                      const taxLabel = t(tax.type, tax.description);
                      return (
                        <section
                          className="flex justify-between"
                          key={tax.type + index}
                        >
                          <section className="flex flex-row gap-1">
                            <section className="flex flex-row gap-1 lg:gap-3">
                              <p className="leading-lg text-xs font-semibold text-dark-1000 md:text-base lg:text-sm lg:leading-[22px]">
                                {taxLabel}
                              </p>
                            </section>
                          </section>

                          <section className="text-right">
                            <section className="flex items-center text-dark-1000 text-xs md:text-base">
                              {showLocalCurrency && (
                                <p className="pr-1 text-[12px] leading-[15px]">
                                  {approxLabel}
                                </p>
                              )}
                              <p className="leading-lg text-xs font-semibold lg:text-sm lg:leading-[22px]">
                                {`${tax.tax_amount?.formatted}${
                                  showLocalCurrency ? '*' : ''
                                }`}
                              </p>
                            </section>
                            {showLocalCurrency && (
                              <p className="text-[12px] leading-[15px]">
                                {tax.tax_original_amount?.formatted}
                              </p>
                            )}
                          </section>
                        </section>
                      );
                    },
                  )
                : 'US$0.00'}
            </section>
            <section className="flex flex-col space-y-1">
              <section className="text-right text-xs md:text-base">
                {resortFeesFormatted}
              </section>
            </section>
          </section>
        </section>
        <Divider className="mt-2 mb-2" />
        <section className="w-full flex justify-between p-3">
          <section className="text-dark-1000 text-xs md:text-base">
            {payAtPropertyLabel}
          </section>
          <section className="text-right text-dark-1000 text-xs md:text-base">
            {rate.rate_breakdown.total_taxes.formatted}
          </section>
        </section>
        {cancellable && (
          <section className="w-full p-4">
            <FreeCancellationExtended
              policy={cancellation_policy?.description}
            />
          </section>
        )}
        <section className="w-full p-4">
          <NonRefundable
            title={false}
            description={cancellationPolicy?.description}
            nonCancellable={nonRefundable}
          />
        </section>
        <section className="w-full underline text-teal-1000 p-3">
          [{supplierLabel.toUpperCase()}] {termsOfServiceLabel}
        </section>
      </section>
    );
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between mx-3 my-3 overflow-hidden border border-t-1 border-b-0  border-x rounded lg:flex-row lg:my-0 border-dark-200">
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
              <section className="hidden lg:block">
                <Price />
              </section>
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
                handleOpenClose={() => setOpen(!open)}
                open={open}
              />
            </section>
          </section>
        </section>
      </div>
      {open && (
        <div className="border rounded mt-[-33px] mx-3 w-full border-t-0 border-b-1 border-x animate-fade">
          <section className="p-3 text-dark-1000 text-xs md:text-base">
            {description}
          </section>
          <section>
            <CollapseBordered
              title={roomAmenitiesLabel}
              body={<RoomAmenities />}
              footer={null}
              titleClassName={'text-xl'}
            />
            <CollapseBordered
              title={featuresLabel}
              body={<RenderChooseFeatures />}
              footer={null}
              titleClassName={'text-xl'}
            />
            <CollapseBordered
              title={priceBreakdownLabel}
              body={<RenderPriceBreakDown />}
              footer={null}
              titleClassName={'text-xl'}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default RoomCard;
