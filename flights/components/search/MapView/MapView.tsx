import Carousel from 'react-multi-carousel';
import { useTranslation } from 'react-i18next';

import CustomArrow from '../../../../components/global/CarouselNew/components/CustomArrow';
import HorizontalItemCard from '../../../../components/global/HorizontalItemCard/HorizontalItemCard';
import LocationMap from '../../../../components/global/LocationMap/LocationMap';
import { useState } from 'react';
import classnames from 'classnames';
import { MapViewProps } from './MapViewTypes';
import FlightItemRateInfo from 'flights/components/search/FlightItemRateInfo';
import { MinRate, Rate } from 'flights/types/response/SearchResponse';
import PriceDisplay from '../../PriceDisplay/PriceDisplay';
import FlightCancellable from 'flights/components/search/FlightCancellable';

const MapView = ({
  FlightCategory,
  items,
  onViewDetailClick,
}: MapViewProps) => {
  const [t, i18next] = useTranslation('flights');
  const flightLabel = t('flight', 'Flight');
  const fromLabel = t('from', 'From');

  const [activeItem, setActiveItem] = useState(0);
  const nextItem = activeItem + 1;
  const handleBeforeCarouselChange = (prev: number) => {
    setActiveItem(prev);
  };

  const currentItem = items?.[activeItem];
  const coordinates = currentItem?.details?.address?.coordinates;

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
        <section className="absolute w-full bottom-0">
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
              const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

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
                    icon={FlightCategory.icon}
                    categoryName={flightLabel}
                    item={item}
                    title={name}
                    image={thumbnail}
                    price={<FlightItemRateInfo minRate={minRate} />}
                    address={formattedLocation}
                    className={cardClassName}
                    rating={parseInt(starRating)}
                    priceDisplay={
                      <PriceDisplay
                        rate={minRate?.rate as Rate}
                        totalLabel={fromLabel}
                      />
                    }
                    cancellable={
                      <FlightCancellable minRate={minRate as MinRate} />
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
