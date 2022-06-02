import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';

import CustomArrow from '../CarouselNew/components/CustomArrow';
import HorizontalItemCard from '../HorizontalItemCard/HorizontalItemCard';
import LocationMap from '../LocationMap/LocationMap';
import { useState } from 'react';
import classnames from 'classnames';
import { MapViewProps } from '../MapView/MapViewTypes';
import HotelItemRateInfo from 'hotels/components/search/HotelItemRateInfo';

const MapView = ({ HotelCategory, items, onViewDetailClick }: MapViewProps) => {
  const [t, i18next] = useTranslation('hotels');
  const hotelLabel = t('hotel', 'Hotel');

  const [activeItem, setActiveItem] = useState(0);
  const nextItem = activeItem + 1;
  const handleBeforeCarouselChange = (prev: number) => {
    setActiveItem(prev);
  };

  const currentItem = items?.[activeItem];
  const coordinates = currentItem?.details?.address?.coordinates;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
      <section className="flex flex-col items-center justify-center">
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
      </section>
      <section className="absolute w-full top-3/4">
        <Carousel
          partialVisible={false}
          responsive={responsive}
          draggable
          autoPlay={false}
          shouldResetAutoplay={false}
          beforeChange={handleBeforeCarouselChange}
          customLeftArrow={
            <CustomArrow
              className="z-10 absolute left-0 -translate-y-7"
              position="left"
            />
          }
          customRightArrow={
            <CustomArrow
              className="z-10 absolute right-0 -translate-y-7"
              position="right"
            />
          }
        >
          {items.map((item, index) => {
            const {
              id,
              details: { name, address, star_rating: starRating },
              min_rate_room: minRateRoom,
              thumbnail,
            } = item;

            const itemKey = item.id + index;
            const isNext = index === nextItem;
            const minRate = minRateRoom.rates.min_rate;
            const formattedLocation = `${address.address1}, ${address.country_code}, ${address.postal_code}`;

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
                  handleOnViewDetailClick={() => onViewDetailClick(item)}
                  item={item}
                  title={name}
                  image={thumbnail}
                  price={<HotelItemRateInfo minRate={minRate} />}
                  address={formattedLocation}
                  className={cardClassName}
                  rating={parseInt(starRating)}
                />
              </section>
            );
          })}
        </Carousel>
      </section>
    </>
  );
};

export default MapView;
