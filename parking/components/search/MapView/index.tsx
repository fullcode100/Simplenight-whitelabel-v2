import {
  Parking,
  PointGeometry,
} from '../../../types/response/ParkingSearchResponse';
import LocationMap from '../../../../components/global/LocationMap/LocationMap';
import { FC, useMemo, useRef, useState } from 'react';
import { ParkingCard } from '../ParkingCard';
import CustomArrow from '../../../../components/global/CarouselNew/components/CustomArrow';
import Carousel from 'react-multi-carousel';

interface ParkingMapViewProps {
  parkingList: Parking[];
}

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

export const ParkingMapView: FC<ParkingMapViewProps> = ({ parkingList }) => {
  const ref = useRef<Carousel | null>(null);
  const [activeItem, setActiveItem] = useState<number>(0);
  const parkingItemsCoordinates = useMemo(() => {
    return parkingList.map((parkingItem) => {
      const point = parkingItem.geometry.geometries.find(
        (geoItem) => geoItem.type === 'Point',
      ) as PointGeometry;

      const [longitude, latitude] = point.coordinates;
      return { longitude, latitude };
    });
  }, [parkingList]);

  const currentItem =
    parkingItemsCoordinates[activeItem] || parkingItemsCoordinates[0];

  if (!parkingItemsCoordinates[activeItem]) {
    ref.current?.goToSlide(0);
  }

  return (
    <section className="relative">
      <LocationMap
        activeMarkerIndex={activeItem}
        center={currentItem}
        coords={parkingItemsCoordinates}
        onClickMarker={(lat, lng, index) => {
          setActiveItem(index);
          ref.current?.goToSlide(index);
        }}
        zoom={14}
        height={575}
      />
      <section className="absolute w-full bottom-0">
        {parkingList.length > 0 && (
          <Carousel
            ref={(el) => {
              ref.current = el;
            }}
            partialVisible={true}
            infinite={false}
            responsive={responsive}
            autoPlay={false}
            shouldResetAutoplay={false}
            beforeChange={setActiveItem}
            customLeftArrow={
              <CustomArrow
                className="z-[9] absolute left-0 -translate-y-7"
                position="left"
              />
            }
            customRightArrow={
              <CustomArrow
                className="z-[9] absolute right-0 -translate-y-7"
                position="right"
              />
            }
          >
            {parkingList.map((parkingItem, index) => {
              return (
                <section key={index + '-image'} className="w-full p-5">
                  <ParkingCard parkingItem={parkingItem} />
                </section>
              );
            })}
          </Carousel>
        )}
      </section>
    </section>
  );
};
