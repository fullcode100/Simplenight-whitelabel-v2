import React, { useState, useRef, ReactElement } from 'react';
import LocationMap from 'components/global/LocationMap/LocationMap';
import Carousel from 'react-multi-carousel';
import PriceDisplay from '../../PriceDisplay/PriceDisplay';
import HorizontalSkeletonList from 'components/global/HorizontalItemCard/HorizontalSkeletonList';
import CustomArrow from 'components/global/CarouselNew/components/CustomArrow';
import { SearchItem } from 'showsAndEvents/types/adapters/SearchItem';
import ResultCard from '../ResultCard/ResultCard';

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

interface IShowAndEventsResultMapViewProps {
  items: SearchItem[];
  isLoading: boolean;
  showCategoryIcon: ReactElement;
  createUrl: (item: SearchItem) => string;
  label: string;
}

const ShowAndEventsResultMapView: React.FC<
  IShowAndEventsResultMapViewProps
> = ({ items, isLoading, showCategoryIcon, createUrl, label }) => {
  /* States */
  const [activeItem, setActiveItem] = useState(0);

  /* Hooks */
  const carouselRef = useRef<Carousel>(null);

  /* Constants */
  const nextItem = activeItem + 1;
  const locations = items?.map((i: any) => {
    return {
      latitude: i.address.coordinates.latitude,
      longitude: i.address.coordinates.longitude,
    };
  });
  const currentItem = items?.[activeItem];
  const coordinates = currentItem?.address?.coordinates;

  /* Functions */
  const handleOnClickMarkerMap = (lat: number, lng: number, index: number) => {
    carouselRef.current?.goToSlide(index);
  };

  const handleBeforeCarouselChange = (prev: number) => {
    setActiveItem(prev);
  };

  return (
    <section className="relative w-full h-full">
      <section className="w-full z-2">
        {!isLoading ? (
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
            height={675}
            locations={locations}
            onClickMarker={handleOnClickMarkerMap}
          />
        ) : (
          <HorizontalSkeletonList />
        )}
      </section>
      <section className="absolute bottom-16 w-full p-5">
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
          ref={carouselRef}
        >
          {items.map((showEvent: SearchItem, index: any) => {
            const url = createUrl(showEvent);
            const {
              id,
              name,
              address,
              cancellationType,
              rate,
              extraData,
              thumbnail,
            } = showEvent;
            const {
              address1,
              city,
              state,
              country_code: countryCode,
            } = address ?? {};
            const formattedLocation = `${[address1, city]
              .filter((item) => item)
              .join(' - ')}${
              [state, countryCode].some((item) => item) ? ',' : ''
            } ${[state, countryCode].filter((item) => item).join(', ')}`;

            const itemKey = id + index;
            const isNext = index === nextItem;
            return (
              <li key={itemKey}>
                <ResultCard
                  url={url}
                  className="flex-0-0-auto transition-all duration-300"
                  icon={showCategoryIcon}
                  categoryName={label}
                  item={showEvent}
                  title={name}
                  address={formattedLocation}
                  fromDate={extraData.starts_at}
                  thumbnail={thumbnail}
                  cancellationType={cancellationType}
                  priceDisplay={
                    <PriceDisplay
                      rate={rate}
                      totalLabel={`${rate.total.net.formatted}`}
                    />
                  }
                />
              </li>
            );
          })}
        </Carousel>
      </section>
    </section>
  );
};

export default ShowAndEventsResultMapView;
