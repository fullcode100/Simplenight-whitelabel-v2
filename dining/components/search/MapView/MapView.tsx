import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';

import CustomArrow from '../../../../components/global/CarouselNew/components/CustomArrow';
import HorizontalItemCard from '../../../../components/global/HorizontalItemCard/HorizontalItemCard';
import LocationMap from '../../../../components/global/LocationMap/LocationMap';
import { useState, useRef } from 'react';
import classnames from 'classnames';
import { MapViewProps } from './MapViewTypes';

const MapView = ({ DiningCategory, items, createUrl }: MapViewProps) => {
  const [t, i18next] = useTranslation('dining');
  const diningLabel = t('dining', 'Dining');
  const fromLabel = t('from', 'From');
  const carouselRef = useRef<Carousel>(null);

  const [activeItem, setActiveItem] = useState(0);
  const nextItem = activeItem + 1;
  const handleBefreCorouselChange = (prev: number) => setActiveItem(prev);

  const currentItem = items?.[activeItem];
  const coordinates = currentItem?.location;
  const locations = items?.map((i) => {
    return {
      latitude: i.location.latitude,
      longitude: i.location.longitude,
    };
  });

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

  const handleOnClickMarkerMap = (lat: number, lng: number, index: number) => {
    carouselRef.current?.goToSlide(index);
  };

  return (
    <div className="w-full h-full">
      <section className="relative">
        <LocationMap
          center={{
            latitude: coordinates?.latitude,
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
          locations={locations}
          onClickMarker={handleOnClickMarkerMap}
        />
        <section className="absolute bottom-0 w-full">
          <Carousel
            partialVisbile={false}
            responsive={responsive}
            draggable
            autoPlay={false}
            shouldResetAutoplay={false}
            beforeChange={handleBefreCorouselChange}
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
            ref={carouselRef}
          >
            {items?.map((item, index) => {
              const {
                id,
                name,
                image: thumbnail,
                rating: starRating,
                location: { address },
              } = item;

              const url = createUrl(item);
              const itemKey = id + index;
              const isNext = index === nextItem;

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
                    icon={''}
                    categoryName={diningLabel}
                    item={item}
                    title={name}
                    image={thumbnail}
                    address={address}
                    className={cardClassName}
                    rating={parseInt(starRating)}
                    url={url}
                  />
                </section>
              );
            })}
          </Carousel>
        </section>
      </section>
    </div>
  );
};

export default MapView;
