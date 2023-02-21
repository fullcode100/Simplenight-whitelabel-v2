import { useState } from 'react';
import classnames from 'classnames';
import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';

import CustomArrow from '../../../../components/global/CarouselNew/components/CustomArrow';
import HorizontalItemCard from '../../../../components/global/HorizontalItemCard/HorizontalItemCard';
import LocationMap from '../../../../components/global/LocationMap/LocationMap';
import { MapViewProps } from './MapViewTypes';
import HotelItemRateInfo from 'hotels/components/search/HotelItemRateInfo';
import PriceDisplay from '../../PriceDisplay/PriceDisplay';
import HotelCancellable from 'hotels/components/search/HotelCancellable';
import { HotelResultFallbackImage } from 'hotels/helpers/HotelResultFallbackImage';

const MapView = ({ HotelCategory, items, createUrl }: MapViewProps) => {
  const [t, i18next] = useTranslation('hotels');
  const hotelLabel = t('hotel', 'Hotel');
  const fromLabel = t('from', 'From');

  const [activeItem, setActiveItem] = useState(0);
  const nextItem = activeItem + 1;
  const handleBeforeCarouselChange = (prev: number) => {
    setActiveItem(prev);
  };

  const currentItem = items?.[activeItem];
  const coordinates = currentItem?.details?.fullAddress?.coordinates;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <section className="relative">
        <LocationMap
          center={{
            latitude: coordinates?.latitude - 0.0013,
            longitude: coordinates?.longitude,
          }}
          coords={[
            {
              latitude: coordinates?.latitude,
              longitude: coordinates?.longitude,
            },
          ]}
          zoom={17}
          height={575}
        />
        <section className="absolute bottom-0 w-full">
          <Carousel
            partialVisible={false}
            responsive={responsive}
            draggable
            autoPlay={false}
            shouldResetAutoplay={false}
            beforeChange={handleBeforeCarouselChange}
            customLeftArrow={
              <CustomArrow
                className="absolute left-0 z-10 -translate-y-7"
                position="left"
              />
            }
            customRightArrow={
              <CustomArrow
                className="absolute right-0 z-10 -translate-y-7"
                position="right"
              />
            }
          >
            {items.map((item, index) => {
              const {
                id,
                details: { name, fullAddress, starRating },
                minRate,
                thumbnail,
              } = item;

              const url = createUrl(item);
              const itemKey = id + index;
              const isNext = index === nextItem;
              const formattedLocation = `${fullAddress?.address}, ${fullAddress?.countryCode}, ${fullAddress?.postalCode}`;

              const cardClassName = classnames(
                'flex-0-0-auto transition-all duration-300',
                {
                  'ml-[-30px]': isNext,
                },
              );

              return (
                <section key={index + '-image'} className="w-full p-5">
                  <HorizontalItemCard
                    key={itemKey}
                    icon={HotelCategory.icon}
                    categoryName={hotelLabel}
                    item={item}
                    title={name}
                    image={thumbnail}
                    price={<HotelItemRateInfo minRate={minRate} />}
                    address={formattedLocation}
                    className={cardClassName}
                    rating={parseInt(starRating)}
                    fallback={<HotelResultFallbackImage />}
                    url={url}
                    priceDisplay={
                      <PriceDisplay
                        rate={minRate}
                        totalLabel={fromLabel}
                        isStartingTotal={true}
                        isPriceBase
                        isAvgAmount
                      />
                    }
                    cancellable={
                      <HotelCancellable minRate={minRate.min_rate} />
                    }
                  />
                </section>
              );
            })}
          </Carousel>
        </section>
      </section>
    </>
  );
};

export default MapView;
